import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export async function GET(request: Request, { params }: { params: { id: number } }) {
    const id = params.id;

    const ordem = await prisma.ordens.findUnique({
        where: {
            id,
        },
        include: {
            clientes: true,
        },
    });

    if (!ordem) {
        let error_response = {
            status: false,
            ordem: [],
            message: 'Não foi encontrado ordem com esta ID',
        };
        return new NextResponse(JSON.stringify(error_response), {
            status: 404,
            headers: { 'Content-Type': 'applicatio/json' },
        });
    }

    let json_response = {
        status: true,
        ordem,
        message: 'Ordem encontrado com sucesso',
    };

    return NextResponse.json(json_response);
}

export async function PATCH(
    request: Request,
    { params }: { params: { id: number } },
) {
    try {
        const id = params.id;
        let json = await request.json();

        const ordem = await prisma.ordens.update({
            where: { id },
            data: json,
        });
        let success = {
            status: true,
            message: 'Ordem editado com successo',
            ordem,
        };
        return new NextResponse(JSON.stringify(success), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        if (error.code === 'P2025') {
            let err = {
                status: false,
                message: 'Não foi encontrado ordem com esta ID',
                ordem: [],
            };
            return new NextResponse(JSON.stringify(err), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        let err = {
            status: false,
            message: error.message,
            ordem: [],
        };
        return new NextResponse(JSON.stringify(err), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: number } },
) {
    try {
        const id = params.id;
        await prisma.ordens.delete({
            where: { id },
        });
        let success = {
            status: true,
            message: 'Ordem excluida com successo',
            // ordem,
        };
        return new NextResponse(JSON.stringify(success),{status: 200}
        );
        // return new NextResponse(null, { status: 204 });

    } catch (error: any) {
        if (error.code === 'P2025') {
            let err = {
                status: false,
                message: 'Não foi encontrado ordem com esta ID',
            };
            return new NextResponse(JSON.stringify(err), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        let err = {
            status: 'error',
            message: error.message,
        };
        return new NextResponse(JSON.stringify(err), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
