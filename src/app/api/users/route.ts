
import { prisma } from "@/libs/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import * as z from 'zod';

const userSchema = z.object({
    name: z.string().min(1, 'O nome é obrigatório'),
    email: z.string().min(1, 'O e-mail é obrigatório').email('E-mail inválido'),
    password: z.string()
    .min(1, 'A senha é obrigatória')
    .min(6, 'A senha ter no mínimo 6 caracteres'),
    role: z.number(),
    status: z.number(),
})

export async function GET() {
    const users = await prisma.users.findMany();
    return NextResponse.json(users)
}

export async function POST(request: Request) {
    // try {
        const body = await request.json();
        const { name, email, password, role, status } = userSchema.parse(body)
        const hashPassword = await hash(password, 12);
        const existingUserByEmail = await prisma.users.findUnique({
            where: { email: email }
        });
        if (existingUserByEmail) {
            return NextResponse.json({ user: null, message: "Já existe usuário com este endereço de email!" }, { status: 409 })
        }
        const newUser = await prisma.users.create({
            data: {
                name,
                email,
                password: hashPassword,
                role,
                status
            },
        });
        const { password: newUserPassword, ...rest } = newUser
        return NextResponse.json({ usuario: rest, message: " Usuário cadastrado com sussesso!" }, { status: 201 })
    // } catch {
    //     return NextResponse.json({ message: "Algo deu errado!" }, { status: 500 })
    // }

}