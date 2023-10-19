import { prisma } from '@/libs/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const clientes = await prisma.clientes.findMany({
        include: {
            ordens: true
        }
    });
    let json_response = {
        status: "success",
        results: clientes.length,
        clientes,
    };

    return NextResponse.json(clientes);
}
