import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const groupId = url.searchParams.get("groupId");

    if (!groupId) {
        return new Response("Group ID is required", { status: 400 });
    }

    try {
        const discussions = await prisma.discussion.findMany({
            where: {
                groupId: groupId,
            },
        });
        return new Response(JSON.stringify(discussions), { status: 200 });
    } catch (error) {
        console.error("Error fetching discussions:", error);
        return new Response("Internal server error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { title, description, groupId, userId } = body;
        if (!title || !description || !groupId || !userId) {
            return new Response("Invalid input. 'title', 'description', 'groupId', and 'userId' are required.", { status: 400 });
        }

        const discussion = await prisma.discussion.create({
            data: body,
        });

        return new Response(JSON.stringify(discussion), { status: 201 });
    } catch (error) {
        console.error("Error creating discussion:", error);
        return new Response("Internal server error", { status: 500 });
    }
}