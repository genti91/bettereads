import { prisma } from "@/lib/prisma";

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
    return Response.json(review);
}