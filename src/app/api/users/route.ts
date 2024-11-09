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
}

export async function GET(req: Request) {
    const url = new URL(req.url);
    const username = url.searchParams.get("username");
    const filters: Filters = {};
    if (username) {
        filters.username = { contains: username, mode: "insensitive" };
    }
    const users = await prisma.user.findMany({ 
        where: filters 
    });
    return Response.json(users);
}