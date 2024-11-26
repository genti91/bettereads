import { prisma } from "@/lib/prisma";

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    await prisma.comment.deleteMany({ where: { discussionId: params.id } });
    const book = await prisma.discussion.delete({ where: { id: params.id } });
    return Response.json(book);
}

export async function GET(_: Request, { params }: { params: { id: string } }) {
    try {
        const discussion = await prisma.discussion.findUnique({
            where: {
                id: params.id
            },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        picture: true
                    }
                },
                comments: {
                    include: {
                        user: {
                            select: {
                                username: true,
                                picture: true
                            }
                        }
                    }
                }
            }
        });
        return Response.json(discussion);
    } catch (error) {
        console.error("Error fetching discussion:", error);
        return new Response("Internal server error", { status: 500 });
    }
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