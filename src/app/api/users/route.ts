import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    const body = await req.json();
    const user = await prisma.user.create({
        data: {
            ...body,
            shelves: {
                create: [
                    { name: "Read" },
                    { name: "To Read" },
                    { name: "Reading" },
                ],
            }
        }
    });
    return Response.json(user);
}

interface Filters {
    username?: {
        contains: string;
        mode: "insensitive";
    };
    id?: {
        equals: string;
    };
}

export async function GET(req: Request) {
    const url = new URL(req.url);
    const username = url.searchParams.get("username");
    const userId = url.searchParams.get("userId");
    const filters: Filters = {};
    if (username) {
        filters.username = { contains: username, mode: "insensitive" };
    }
    if (userId) {
        filters.id = { equals: userId };
    }
    const users = await prisma.user.findMany({ 
        where: filters,
        include: userId ? { 
            reviews: {
                include: { 
                    Book: true,
                    user: true,
                }
            },
            bookHistory: true, 
        } : null
    });
    return Response.json(users);
}