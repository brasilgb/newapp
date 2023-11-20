import {prisma} from '@/libs/prisma';
import {NextRequest, NextResponse} from 'next/server';

export async function GET(request: Request, {params}: {params: {q: string}}) {
    const ordens = await prisma.ordens.findMany({
        orderBy: {
            id: 'desc',
        },
        include: {
            clientes: true,
        },
    });

    return NextResponse.json(ordens);
}

export async function POST(request: Request) {
    try {
        const json = await request.json();

        const cliente = await prisma.ordens.create({
            data: json,
        });

        let json_response = {
            status: true,
            message: 'Cliente cadastrado com sucesso',
            cliente,
        };
        return new NextResponse(JSON.stringify(json_response), {
            status: 201,
            headers: {'Content-Type': 'application/json'},
        });
    } catch (error: any) {
        if (error.code === 'P2002') {
            let err = {
                status: false,
                message: 'Já existe cliente com este CPF',
                cliente: [],
            };
            return new NextResponse(JSON.stringify(err), {
                status: 409,
                headers: {'Content-Type': 'application/json'},
            });
        }

        let err = {
            status: 'erro',
            message: error.message,
        };
        return new NextResponse(JSON.stringify(err), {
            status: 500,
            headers: {'Content-Type': 'application/json'},
        });
    }
}
