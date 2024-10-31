import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    const body = await req.json();
    const user = await prisma.user.create({
        data: body
    });
    return Response.json(user);
}

export async function GET() {
    const users = await prisma.user.findMany();
    return Response.json(users);
}