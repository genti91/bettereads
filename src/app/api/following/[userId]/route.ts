import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { userId: string } }) {
    const followers = await prisma.follows.findMany({
        where: { followerId: params.userId },
        include: {
            following: {
                select: {
                    username: true,
                    name: true,
                    picture: true,
                },
            },
        },
    });
    return Response.json(followers);
}