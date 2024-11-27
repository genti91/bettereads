import { prisma } from "@/lib/prisma";
import { BookAction } from "@prisma/client";

interface Filters {
    title?: {
        contains: string;
        mode: "insensitive";
    };
    userId?: string;
    shelves?: { some: { id?: string, userId?: string } };
}

export async function GET(req: Request) {
    const url = new URL(req.url);
    const title = url.searchParams.get("title");
    const by_user = url.searchParams.get("by_user");
    const by_genres = url.searchParams.getAll("by_genres")
    const shelfId = url.searchParams.get("shelf");
    const shlvesUserId = url.searchParams.get("all_shelves");
    const rating = parseInt(url.searchParams.get("rating") || "0");
  
    const filters: Filters = {};
  
    if (title) {
        filters.title = { contains: title, mode: "insensitive" };
    }
    if (by_user) {
        filters.userId = by_user;
    }
    if (shelfId) {
        filters.shelves = { some: { id: shelfId } };
    } else if (shlvesUserId) {
        filters.shelves = { some: { userId: shlvesUserId } };
    }

    let books = await prisma.book.findMany({ 
        include: { 
            genres: by_genres.length > 0,
            reviews: rating > 0
        }, 
        where: filters ,
        orderBy: {
            createdAt: 'asc'
        },
    });

    if (rating > 0) {
        books = books.filter(book => {
            const averageRating = book.reviews.reduce((sum, review) => sum + review.rating, 0) / book.reviews.length;
            return averageRating >= rating;
        });
    }

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
    await prisma.bookHistory.create({
        data: {
            userId: body.userId,
            action: BookAction.CREATE,
            title: body.title,
            author: body.author
        }
    });
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