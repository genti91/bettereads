import { prisma } from "@/lib/prisma";
import { ActivityType } from "@prisma/client";

export async function POST(req: Request) {
    const body = await req.json();
    const review = await prisma.review.create({ 
        data: {
            rating: body.rating,
            description: body.description,
            userId: body.userId,
            bookId: body.bookId, 
        }
    });
    await prisma.activity.create({
        data: {
            type: ActivityType.ADD_REVIEW,
            userId: body.userId,
            bookId: body.bookId,
            reviewId: review.id,
        },
    });
    const avgRating = await prisma.review.aggregate({
        where: { bookId: body.bookId },
        _avg: { rating: true },
    });
    await prisma.book.update({
        where: { id: body.bookId },
        data: { rating: avgRating._avg.rating ?? 0 },
    });
    return Response.json(review);
}