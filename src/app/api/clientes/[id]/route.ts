import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';


export async function GET(request: Request,
    { params }: { params: { id: number } }) {
    const id = params.id;

    const cliente = await prisma.clientes.findUnique({
        where: {
            id,
        },
        include: {
            ordens: true
        }
    });

    if (!cliente) {
        let error_response = {
            status: "Falha",
            message: "Não foi encontrado cliente com esta ID",
        };
        return new NextResponse(JSON.stringify(error_response), {
            status: 404,
            headers: { "Content-Type": "applicatio/json" }
        });
    }

    let json_response = {
        status: "sucesso",
        data: {
            cliente,
        },
    };

    return NextResponse.json(json_response);
}

export function DELETE() {
    return NextResponse.json({
        message: 'Deleta um usuário ...',
    });
}

export function PUT() {
    return NextResponse.json({
        message: 'Altera um usuário ...',
    });
}
