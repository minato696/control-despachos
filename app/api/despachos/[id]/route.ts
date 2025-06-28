// app/api/despachos/[id]/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Obtener un despacho por ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const despacho = await prisma.despachos.findUnique({
      where: { id },
      include: {
        reportero: {
          include: { ciudad: true }
        }
      }
    });
    
    if (!despacho) {
      return NextResponse.json({ error: 'Despacho no encontrado' }, { status: 404 });
    }
    
    return NextResponse.json(despacho);
  } catch (error) {
    console.error('Error al obtener despacho:', error);
    return NextResponse.json({ error: 'Error al obtener despacho' }, { status: 500 });
  }
}

// Actualizar un despacho
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const data = await request.json();
    
    const despacho = await prisma.despachos.update({
      where: { id },
      data: {
        titulo: data.titulo,
        hora_despacho: data.hora_despacho,
        hora_en_vivo: data.hora_en_vivo,
        fecha_despacho: data.fecha_despacho ? new Date(data.fecha_despacho) : undefined,
        estado: data.estado
      },
      include: {
        reportero: {
          include: { ciudad: true }
        }
      }
    });
    
    return NextResponse.json(despacho);
  } catch (error) {
    console.error('Error al actualizar despacho:', error);
    return NextResponse.json({ error: 'Error al actualizar despacho' }, { status: 500 });
  }
}

// Eliminar un despacho
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    await prisma.despachos.delete({
      where: { id }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error al eliminar despacho:', error);
    return NextResponse.json({ error: 'Error al eliminar despacho' }, { status: 500 });
  }
}