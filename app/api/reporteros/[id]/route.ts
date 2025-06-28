// app/api/reporteros/[id]/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Obtener un reportero por ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const reportero = await prisma.reporteros.findUnique({
      where: { id },
      include: {
        ciudad: true,
        despachos: {
          orderBy: { fecha_despacho: 'desc' }
        }
      }
    });
    
    if (!reportero) {
      return NextResponse.json({ error: 'Reportero no encontrado' }, { status: 404 });
    }
    
    return NextResponse.json(reportero);
  } catch (error) {
    console.error('Error al obtener reportero:', error);
    return NextResponse.json({ error: 'Error al obtener reportero' }, { status: 500 });
  }
}

// Actualizar un reportero
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const data = await request.json();
    
    const reportero = await prisma.reporteros.update({
      where: { id },
      data: {
        nombre: data.nombre,
        estado: data.estado,
        ciudad: data.ciudad_id ? { connect: { id: data.ciudad_id } } : undefined
      },
      include: { ciudad: true }
    });
    
    return NextResponse.json(reportero);
  } catch (error) {
    console.error('Error al actualizar reportero:', error);
    return NextResponse.json({ error: 'Error al actualizar reportero' }, { status: 500 });
  }
}

// Eliminar un reportero
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    // Primero eliminar los despachos asociados
    await prisma.despachos.deleteMany({
      where: { reportero_id: id }
    });
    
    // Luego eliminar el reportero
    await prisma.reporteros.delete({
      where: { id }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error al eliminar reportero:', error);
    return NextResponse.json({ error: 'Error al eliminar reportero' }, { status: 500 });
  }
}