import { prisma } from "@/lib/prisma";

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    const book = await prisma.discussion.delete({ where: { id: params.id } });
    return Response.json(book);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const body = await req.json();
        const { title, description } = body;
        if (!title && !description) {
            return Response.json({ error: "Please provide a title or description" }, { status: 400 });
        }
        const discussion = await prisma.discussion.update({
            where: { id: params.id },
            data: {
                ...body
            }
        });
        return Response.json(discussion);
    } catch (error) {
        return Response.json({ error: "An error occurred" }, { status: 500 });
    }
}