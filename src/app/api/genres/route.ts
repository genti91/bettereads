import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    const body = await req.json();
    const genre = await prisma.genre.create({
        data: {
            name: body.name
        }
    });
    return Response.json(genre);
}

export async function GET() {
    const genres = await prisma.genre.findMany();
    return Response.json(genres.map(genre => genre.name));
}