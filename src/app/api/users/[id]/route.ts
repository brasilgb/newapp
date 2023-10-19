import {NextResponse} from 'next/server';

export function GET() {
    return NextResponse.json({
        message: 'Listar um usuário ...',
    });
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
