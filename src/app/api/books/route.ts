import { prisma } from "@/lib/prisma";

interface Filters {
    title?: {
        contains: string;
    };
    userId?: string;
}

export async function GET(req: Request) {
    const url = new URL(req.url);
    const title = url.searchParams.get("title");
    const by_user = url.searchParams.get("by_user");
    const by_genres = url.searchParams.getAll("by_genres")

    const filters: Filters = {};
    if (title) {
        filters.title = { contains: title };
    }
    if (by_user) {
        filters.userId = by_user;
    }

    let books = await prisma.book.findMany({ include: { genres: true }, where: filters });
    if (by_genres.length > 0) {
        books = books.filter(book => {
            const bookGenres = book.genres.map(genre => genre.name);
            return by_genres.every(genre => bookGenres.includes(genre));
        });
    }

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