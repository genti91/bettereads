import { prisma } from '@/lib/prisma';

// TODO: Borrar cuando la historia del otro leaderboard esté lista.
export const getTopUsersByAmountReviews = async () => {
    const MAX_AMOUNT_REVIEWS = 1;
  
    const query = await prisma.review.groupBy({
      by: ['userId'], 
      _count: {
        id: true,
      },
      orderBy: {
        _count: {
          id: 'desc',
        },
      },
      take: MAX_AMOUNT_REVIEWS,
    });

    const top_users = await Promise.all(
      query.map(async (group) => {
        const user = await prisma.user.findUnique({
          where: { id: group.userId },
          select: {
            username: true,
          },
        });
  
        return {
          ...user,
          reviewCount: group._count.id,
        };
      })
    );

    return new Response(JSON.stringify(top_users), { status: 200 });
};

export { getTopUsersByAmountReviews as GET };
