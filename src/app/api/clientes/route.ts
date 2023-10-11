
import { prisma } from "@/libs/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import * as z from 'zod';

export async function GET() {
    const clientes = await prisma.clientes.findMany();
    return NextResponse.json(clientes)
}
