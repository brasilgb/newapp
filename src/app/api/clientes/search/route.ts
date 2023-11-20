
import { prisma } from '@/libs/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const param: any = searchParams.get("q");

    const cliente = await prisma.clientes.findMany({
        where: {
            OR: [
                {
                    nome: {
                        contains: param
                    }
                }
            ]
        },
        include: {
            ordens: true,
        },
    });

    if (!cliente) {
        let error_response = {
            status: false,
            cliente: [],
            message: 'Não foi encontrado clientes com esta chave',
        };
        return new NextResponse(JSON.stringify(error_response), {
            status: 404,
            headers: { 'Content-Type': 'applicatio/json' },
        });
    }

    let json_response = {
        status: true,
        cliente,
        message: `Foram encontrados  (${cliente.length}) clientes`,
    };

    return NextResponse.json(json_response);
}