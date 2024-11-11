import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    const { followerId, followingId } = await req.json();
    const follow = await prisma.follows.create({
        data: {
            followerId,
            followingId,
        },
    });
    return Response.json(follow);
}

export async function DELETE(req: Request) {
    const { followerId, followingId } = await req.json();
    await prisma.follows.deleteMany({
        where: {
            followerId,
            followingId,
        },
    });
    return Response.json({ message: "Unfollowed" });
}