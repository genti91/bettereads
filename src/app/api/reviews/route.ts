import { prisma } from "@/lib/prisma";
import { ActivityType } from "@prisma/client";

export async function POST(req: Request) {
    const body = await req.json();
    await prisma.activity.create({
        data: {
            type: ActivityType.ADD_REVIEW,
            userId: body.userId,
            bookId: body.bookId,
            reviewId: body.reviewId,
        },
    });
    const review = await prisma.review.create({ 
        data: {
            rating: body.rating,
            description: body.description,
            userId: body.userId,
            bookId: body.bookId, 
        }
    });
    return Response.json(review);
}