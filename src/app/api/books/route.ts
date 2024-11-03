import { prisma } from "@/lib/prisma";

interface Filters {
    title?: {
        contains: string;
    };
    genres?:
        | {
            some: {
                name: {
                    in: string[];
                };
            };
        }
        | {
            every: {
                name: {
                    in: string[];
                };
            };
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
    if (by_genres.length == 1){
        filters.genres = {
            some: {
                name: {
                    in: by_genres,
                },
            },
        };
    }
    if (by_genres.length > 1){
        filters.genres = {
            every: {
                name: {
                    in: by_genres,
                },
            },
        };
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