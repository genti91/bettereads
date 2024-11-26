import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
    const topBooks = await prisma.book.findMany({
        take: 5,
        orderBy: {
            rating: 'desc'
        }
    });

    return Response.json(topBooks);
}
