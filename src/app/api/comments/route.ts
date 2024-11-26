import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { content, discussionId, userId } = body;
        if (!content || !discussionId || !userId) {
            return new Response("Invalid input. 'content', 'discussionId', and 'userId' are required.", { status: 400 });
        }

        const comment = await prisma.comment.create({
            data: body,
        });

        return new Response(JSON.stringify(comment), { status: 201 });
    } catch (error) {
        console.error("Error creating comment:", error);
        return new Response("Internal server error", { status: 500 });
    }
}