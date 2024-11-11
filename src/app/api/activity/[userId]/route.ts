import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { userId }: { userId: string }) {
    const activity = await prisma.activity.findMany({
        where: {
          user: {
            following: {
              some: { followerId: userId }
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        include: {
          user: true,
          book: { select: { id: true, title: true, author: true, imageUrl: true } },
          shelf: { select: { id: true, name: true, type: true } },
          review: { select: { id: true, rating: true, description: true } }
        }
      });

    return Response.json(activity);
}