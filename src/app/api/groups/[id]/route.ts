import { prisma } from "@/lib/prisma";

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    const book = await prisma.group.delete({ where: { id: params.id } });
    return Response.json(book);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const body = await req.json();
    const currentGroup = await prisma.group.findUnique({
        where: { id: params.id },
        include: { users: true }
    });
    const currentUsers = currentGroup?.users.map(user => user.id) || [];
    const newUsers = body.users || [];
    const usersToDisconnect = currentUsers.filter(userId => !newUsers.includes(userId));
    const group = await prisma.group.update({
        where: { id: params.id },
        data: {
            ...body,
            users: {
                connect: newUsers.map((userId: string) => ({ id: userId })),
                disconnect: usersToDisconnect.map((userId: string) => ({ id: userId })),
            }
        }
    });
    return Response.json(group);
}