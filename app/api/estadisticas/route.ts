// app/api/estadisticas/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const periodo = searchParams.get('periodo') || 'semanal';
    
    // Calcular fechas para el período
    const hoy = new Date();
    let fechaInicio = new Date();
    
    if (periodo === 'diario') {
      fechaInicio.setHours(0, 0, 0, 0);
    } else if (periodo === 'semanal') {
      // Inicio de la semana (Lunes)
      const dia = hoy.getDay() || 7; // 0 es domingo, así que lo convertimos a 7
      fechaInicio.setDate(hoy.getDate() - dia + 1);
      fechaInicio.setHours(0, 0, 0, 0);
    } else if (periodo === 'mensual') {
      fechaInicio.setDate(1);
      fechaInicio.setHours(0, 0, 0, 0);
    }
    
    // Obtener todos los despachos del período
    const despachos = await prisma.despachos.findMany({
      where: {
        fecha_despacho: {
          gte: fechaInicio,
          lte: hoy
        }
      },
      include: {
        reportero: {
          include: { ciudad: true }
        }
      }
    });
    
    // Calcular estadísticas básicas
    const totalDespachos = despachos.length;
    
    // Calcular días transcurridos en el período
    const diasTranscurridos = Math.max(1, Math.ceil((hoy.getTime() - fechaInicio.getTime()) / (1000 * 60 * 60 * 24)));
    const promedioDespachosDiarios = totalDespachos / diasTranscurridos;
    
    // Reporteros activos (los que tienen al menos un despacho en el período)
    const reporterosIds = [...new Set(despachos.map(d => d.reportero_id))];
    const reporterosActivos = reporterosIds.length;
    
    // Ciudades con despachos
    const ciudadesIds = [...new Set(despachos.map(d => d.reportero.ciudad_id))];
    
    // Total de ciudades en el sistema
    const totalCiudades = await prisma.ciudades.count({
      where: { activo: true }
    });
    
    const coberturaNacional = (ciudadesIds.length / Math.max(1, totalCiudades)) * 100;
    
    // Despachos en vivo
    const despachosEnVivo = despachos.filter(d => d.hora_en_vivo).length;
    
    // Despachos con problemas
    const despachosConProblemas = despachos.filter(d => d.estado === 'problema').length;
    
    // Top ciudades
    const ciudadesMap = despachos.reduce((acc: any, despacho) => {
      const ciudadId = despacho.reportero.ciudad_id;
      const ciudadNombre = despacho.reportero.ciudad.nombre;
      
      if (!acc[ciudadId]) {
        acc[ciudadId] = { 
          id: ciudadId, 
          nombre: ciudadNombre, 
          despachos: 0 
        };
      }
      
      acc[ciudadId].despachos++;
      return acc;
    }, {});
    
    const topCiudades = Object.values(ciudadesMap)
      .sort((a: any, b: any) => b.despachos - a.despachos)
      .slice(0, 5)
      .map((ciudad: any) => ({
        ...ciudad,
        porcentaje: Math.round((ciudad.despachos / Math.max(1, totalDespachos)) * 100)
      }));
    
    // Top reporteros
    const reporterosMap = despachos.reduce((acc: any, despacho) => {
      const reporteroId = despacho.reportero_id;
      const reporteroNombre = despacho.reportero.nombre;
      const ciudadNombre = despacho.reportero.ciudad.nombre;
      
      if (!acc[reporteroId]) {
        acc[reporteroId] = { 
          id: reporteroId, 
          nombre: reporteroNombre, 
          ciudad: ciudadNombre,
          despachos: 0 
        };
      }
      
      acc[reporteroId].despachos++;
      return acc;
    }, {});
    
    const topReporteros = Object.values(reporterosMap)
      .sort((a: any, b: any) => b.despachos - a.despachos)
      .slice(0, 5)
      .map((reportero: any) => ({
        ...reportero,
        porcentaje: Math.round((reportero.despachos / Math.max(1, totalDespachos)) * 100)
      }));
    
    // Despachos por día (para la última semana)
    const ultimaSemana = new Date();
    ultimaSemana.setDate(hoy.getDate() - 7);
    
    // Agrupar los despachos por día
    const despachosPorDiaMap = despachos
      .filter(d => new Date(d.fecha_despacho) >= ultimaSemana)
      .reduce((acc: any, despacho) => {
        const fecha = despacho.fecha_despacho.toISOString().split('T')[0];
        
        if (!acc[fecha]) {
          acc[fecha] = { dia: fecha, total: 0 };
        }
        
        acc[fecha].total++;
        return acc;
      }, {});
    
    // Convertir a array y ordenar por fecha
    const despachosPorDia = Object.values(despachosPorDiaMap)
      .sort((a: any, b: any) => new Date(a.dia).getTime() - new Date(b.dia).getTime());
    
    return NextResponse.json({
      totalDespachos,
      promedioDespachosDiarios: parseFloat(promedioDespachosDiarios.toFixed(2)),
      reporterosActivos,
      coberturaNacional: parseFloat(coberturaNacional.toFixed(2)),
      despachosEnVivo,
      porcentajeEnVivo: parseFloat(((despachosEnVivo / Math.max(1, totalDespachos)) * 100).toFixed(2)),
      despachosConProblemas,
      porcentajeConProblemas: parseFloat(((despachosConProblemas / Math.max(1, totalDespachos)) * 100).toFixed(2)),
      topCiudades,
      topReporteros,
      despachosPorDia
    });
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    return NextResponse.json({ error: 'Error al obtener estadísticas' }, { status: 500 });
  }
}