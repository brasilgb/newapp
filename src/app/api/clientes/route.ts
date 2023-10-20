import {prisma} from '@/libs/prisma';
import {NextRequest, NextResponse} from 'next/server';

export async function GET(request: NextRequest) {
    const clientes = await prisma.clientes.findMany({
        include: {
            ordens: true,
        },
    });

    return NextResponse.json(clientes);
}

export async function POST(request: Request) {
    try {
        const json = await request.json();

        const cliente = await prisma.clientes.create({
            data: json,
        });

        let json_response = {
            status: 'sucesso',
            cliente,
        };
        return new NextResponse(JSON.stringify(json_response), {
            status: 201,
            headers: {'Content-Type': 'application/json'},
        });
    } catch (error: any) {
        if (error.code === 'P2002') {
            let err = {
                status: 'falha',
                message: 'Já existe cliente com este email',
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
