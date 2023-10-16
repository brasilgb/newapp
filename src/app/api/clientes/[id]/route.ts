import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(request: Request,
    { params }: { params: { id: number } }) {

    const id = params?.id

    const user = await prisma.clientes.findMany({
        where: {
            id: id
        }
    });
    return NextResponse.json(user)
}

export function DELETE() {
    return NextResponse.json({
        'message': "Deleta um usuário ..."
    })
}

export function PUT() {
    return NextResponse.json({
        'message': "Altera um usuário ..."
    })
}