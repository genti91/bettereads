import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { userId: string } }) {
    const followers = await prisma.follows.findMany({
        where: { followingId: params.userId },
        include: {
            follower: {
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