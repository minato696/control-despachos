// app/api/despachos/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const fecha = searchParams.get('fecha');
    const reportero_id = searchParams.get('reportero_id');
    const ciudad_codigo = searchParams.get('ciudad_codigo');
    
    console.log('Recibiendo solicitud en /api/despachos con params:', { fecha, reportero_id, ciudad_codigo });

    // Construir where de forma segura
    let where: any = {};
    
    // Agregar filtro por fecha si existe
    if (fecha) {
      try {
        const fechaObj = new Date(fecha);
        // Verificar que la fecha es válida
        if (!isNaN(fechaObj.getTime())) {
          where.fecha_despacho = fechaObj;
        }
      } catch (error) {
        console.error('Formato de fecha inválido:', fecha);
      }
    }
    
    // Agregar filtro por reportero_id si existe
    if (reportero_id && !isNaN(parseInt(reportero_id))) {
      where.reportero_id = parseInt(reportero_id);
    }
    
    // Agregar filtro por ciudad_codigo si existe
    if (ciudad_codigo) {
      try {
        const ciudad = await prisma.ciudades.findUnique({
          where: { codigo: ciudad_codigo }
        });
        
        if (ciudad) {
          // Usamos conectores AND para los filtros anidados
          where.reportero = {
            ciudad_id: ciudad.id
          };
        } else {
          console.log(`Ciudad con código ${ciudad_codigo} no encontrada`);
        }
      } catch (error) {
        console.error('Error al buscar ciudad:', error);
      }
    }
    
    console.log('Consulta de Prisma donde:', where);
    
    // Buscar despachos con los filtros
    const despachos = await prisma.despachos.findMany({
      where,
      include: { 
        reportero: {
          include: { ciudad: true }
        }
      },
      orderBy: [
        { fecha_despacho: 'desc' },
        { hora_despacho: 'asc' }
      ]
    });
    
    console.log(`Encontrados ${despachos.length} despachos`);
    
    return NextResponse.json(despachos);
  } catch (error) {
    console.error('Error en endpoint /api/despachos:', error);
    // Devolver mensaje de error detallado en desarrollo
    const errorMessage = process.env.NODE_ENV === 'development' 
      ? { error: `Error en endpoint de despachos: ${error instanceof Error ? error.message : 'Error desconocido'}` }
      : { error: 'Error al obtener despachos' };
      
    return NextResponse.json(errorMessage, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log("Datos recibidos en POST despachos:", data);
    
    // Validaciones básicas
    if (!data.reportero_id || !data.numero_despacho) {
      return NextResponse.json(
        { error: 'reportero_id y numero_despacho son campos obligatorios' }, 
        { status: 400 }
      );
    }
    
    // Verificar que la fecha es válida
    let fecha_despacho;
    try {
      fecha_despacho = new Date(data.fecha_despacho);
      if (isNaN(fecha_despacho.getTime())) {
        throw new Error('Fecha inválida');
      }
    } catch (error) {
      return NextResponse.json(
        { error: 'Formato de fecha inválido' }, 
        { status: 400 }
      );
    }
    
    const despacho = await prisma.despachos.create({
      data: {
        reportero_id: data.reportero_id,
        numero_despacho: data.numero_despacho,
        titulo: data.titulo || '',
        hora_despacho: data.hora_despacho || '',
        hora_en_vivo: data.hora_en_vivo || '',
        fecha_despacho,
        estado: data.estado || 'programado'
      },
      include: { 
        reportero: {
          include: { ciudad: true }
        }
      }
    });
    
    return NextResponse.json(despacho);
  } catch (error) {
    console.error('Error al crear despacho:', error);
    // Devolver mensaje de error detallado en desarrollo
    const errorMessage = process.env.NODE_ENV === 'development' 
      ? { error: `Error al crear despacho: ${error instanceof Error ? error.message : 'Error desconocido'}` }
      : { error: 'Error al crear despacho' };
      
    return NextResponse.json(errorMessage, { status: 500 });
  }
}