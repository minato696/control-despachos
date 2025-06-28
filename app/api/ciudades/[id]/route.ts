// app/api/ciudades/[id]/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Obtener una ciudad por ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const ciudad = await prisma.ciudades.findUnique({
      where: { id },
      include: {
        reporteros: true,
        _count: {
          select: { reporteros: true }
        }
      }
    });
    
    if (!ciudad) {
      return NextResponse.json({ error: 'Ciudad no encontrada' }, { status: 404 });
    }
    
    return NextResponse.json(ciudad);
  } catch (error) {
    console.error('Error al obtener ciudad:', error);
    return NextResponse.json({ error: 'Error al obtener ciudad' }, { status: 500 });
  }
}

// Actualizar una ciudad
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const data = await request.json();
    
    const ciudad = await prisma.ciudades.update({
      where: { id },
      data: {
        codigo: data.codigo,
        nombre: data.nombre,
        activo: data.activo
      }
    });
    
    return NextResponse.json(ciudad);
  } catch (error) {
    console.error('Error al actualizar ciudad:', error);
    return NextResponse.json({ error: 'Error al actualizar ciudad' }, { status: 500 });
  }
}

// Eliminar una ciudad
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    await prisma.ciudades.delete({
      where: { id }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error al eliminar ciudad:', error);
    return NextResponse.json({ error: 'Error al eliminar ciudad' }, { status: 500 });
  }
}