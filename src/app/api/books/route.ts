import { prisma } from "@/lib/prisma";

interface Filters {
    title?: {
        contains: string;
    };
    userId?: string;
    shelves?: { some: { id?: string, userId?: string } };
}

export async function GET(req: Request) {
    const url = new URL(req.url);
    const title = url.searchParams.get("title");
    const by_user = url.searchParams.get("by_user");
    const shelfId = url.searchParams.get("shelf");
    const shlvesUserId = url.searchParams.get("all_shelves");
    const filters: Filters = {};
    if (title) {
        filters.title = { contains: title };
    }
    if (by_user) {
        filters.userId = by_user;
    }
    if (shelfId) {
        filters.shelves = { some: { id: shelfId } };
    } else if (shlvesUserId) {
        filters.shelves = { some: { userId: shlvesUserId } };
    }
    const books = await prisma.book.findMany({ where: filters });
    return Response.json(books);
}

export async function POST(req: Request) {
    const body = await req.json();
    const genres = body.genres.map((genreName: string) => ({
        name: genreName
    }));
    const book = await prisma.book.create({ 
        data: {
            ...body,
            genres: {
                connect: genres
            }
        }
    });
    return Response.json(book);
}