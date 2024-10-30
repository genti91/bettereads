import { prisma } from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const body = await req.json();
    const book = await prisma.review.update({
        where: { id: params.id },
        data: body
    });
    return Response.json(book);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const review = await prisma.review.delete({
        where: { id: params.id }
    });
    return Response.json(review);
}