import { prisma } from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const body = await req.json();
    const review = await prisma.review.update({
        where: { id: params.id },
        data: body
    });
    const avgRating = await prisma.review.aggregate({
        where: { bookId: review.bookId },
        _avg: { rating: true },
    });
    await prisma.book.update({
        where: { id: review.bookId },
        data: { rating: avgRating._avg.rating ?? 0 },
    });
    return Response.json(review);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    await prisma.activity.deleteMany({
        where: { reviewId: params.id }
    });
    const review = await prisma.review.delete({
        where: { id: params.id }
    });
    const avgRating = await prisma.review.aggregate({
        where: { bookId: review.bookId },
        _avg: { rating: true },
    });
    await prisma.book.update({
        where: { id: review.bookId },
        data: { rating: avgRating._avg.rating ?? 0 },
    });
    return Response.json(review);
}