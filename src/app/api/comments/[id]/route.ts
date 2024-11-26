import { prisma } from "@/lib/prisma";

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    const book = await prisma.comment.delete({ where: { id: params.id } });
    return Response.json(book);
}