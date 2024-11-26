import { prisma } from "@/lib/prisma";

export async function GET(_: Request, { params }: { params: { id: string } }) {
    try {
        const group = await prisma.group.findUnique({
            where: {
                id: params.id
            },
            include: {
                users: true,
                discussions: true
            }
        });
        return Response.json(group);
    } catch (error) {
        console.error("Error fetching group:", error);
        return new Response("Internal server error", { status: 500 });
    }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    const book = await prisma.group.delete({ where: { id: params.id } });
    return Response.json(book);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const body = await req.json();
    const data: any = {};
    if (body.name !== undefined) {
        data.name = body.name;
    }
    if (body.description !== undefined) {
        data.description = body.description;
    }
    if (body.userToAdd || body.userToRemove) {
        data.users = {};
        if (body.userToAdd) {
            data.users.connect = { id: body.userToAdd };
        }
        if (body.userToRemove) {
            data.users.disconnect = { id: body.userToRemove };
        }
    }
    const group = await prisma.group.update({
        where: { id: params.id },
        data
    });
    return Response.json(group);
}