import { prisma } from "@/lib/prisma";

export async function GET(_:Request, { userId }: { userId: string }) {
    const activity = await prisma.activity.findMany({
        where: {
            user: {
                followers: {
                    some: { followingId: userId }
                }
            }
        },
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { id: true, name: true, username: true, picture: true } },
          book: { select: { id: true, title: true, author: true, imageUrl: true } },
          shelf: { select: { id: true, name: true, type: true } },
          review: { select: { id: true, rating: true, description: true } }
        }
      });

    return Response.json(activity);
}