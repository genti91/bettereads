import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    let book = await prisma.book.findUnique({where: { id: params.id }})
    return Response.json(book);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const book = await prisma.book.delete({ where: { id: params.id } });
    return Response.json(book);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const body = await req.json();
    const book = await prisma.book.update({ where: { id: params.id }, data: body });
    return Response.json(book);
}