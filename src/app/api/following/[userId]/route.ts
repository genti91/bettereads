import { prisma } from "@/lib/prisma";

interface Filters {
    followingId?: string;
}

export async function GET(req: Request, { params }: { params: { userId: string } }) {
    const url = new URL(req.url);
    const followingId = url.searchParams.get("followingId");
    const filters: Filters = {};
    if (followingId) {
        filters.followingId = followingId;
    }
    const followers = await prisma.follows.findMany({
        where: { 
            followerId: params.userId,
            ...filters,
        },
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