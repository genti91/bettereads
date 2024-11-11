import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    const body = await req.json();
    const shelf = await prisma.shelf.create({
        data: {
            name: body.name,
            type: body.type,
            userId: body.userId
        }
    });
    return Response.json(shelf);
}

export async function GET(req: Request) {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
    const bookId = url.searchParams.get("bookId");
    if (!userId) {
        return new Response("Missing userId", { status: 400 });
    }
    const shelves = await prisma.shelf.findMany({
        where: {
            userId: userId,
            books: bookId ? { some: { id: bookId } } : undefined,
        },
        include: {
            books: {
                select: {
                    id: true,
                },
            },
        },
    });
    const shelvesWithBookCount = shelves.map(shelf => ({
        ...shelf,
        bookCount: shelf.books.length,
    }));
    return new Response(JSON.stringify(shelvesWithBookCount), { status: 200 });
}

export async function PUT(req: Request) {
    const body = await req.json();
    const shelf = await prisma.shelf.update({
        where: {
            id: body.id,
        },
        data: {
            name: body.name,
        },
    });
    return Response.json(shelf);
}

export async function DELETE(req: Request) {
    const body = await req.json();
    await prisma.shelf.delete({
        where: {
            id: body.id,
        },
    });
    return new Response("shelf deleted", { status: 200 });
}