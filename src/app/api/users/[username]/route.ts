import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { username: string } }) {
    const users = await prisma.user.findUnique({
        where: { username: params.username },
    });
    return Response.json(users);
}