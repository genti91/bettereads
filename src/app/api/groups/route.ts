import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    if (!userId) {
        return new Response("User ID is required", { status: 400 });
    }

    try {
        const groups = await prisma.group.findMany({
            where: {
                users: {
                    some: {
                        id: userId,
                    },
                },
            },
            orderBy: {
                updatedAt: "desc",
            }
        });
        return new Response(JSON.stringify(groups), { status: 200 });
    } catch (error) {
        console.error("Error fetching groups:", error);
        return new Response("Internal server error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, createdBy, description } = body;
        if (!name || !createdBy || !description) {
            return new Response("Invalid input. 'name' and 'createdBy' are required.", { status: 400 });
        }

        const group = await prisma.group.create({
            data: {
                name,
                description,
                createdBy,
                users: {
                    connect: { id: createdBy },
                },
            },
        });

        return new Response(JSON.stringify(group), { status: 201 });
    } catch (error) {
        console.error("Error creating group:", error);
        return new Response("Internal server error", { status: 500 });
    }
}