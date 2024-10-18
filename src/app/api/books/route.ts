import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const title = url.searchParams.get("title");
    const id = url.searchParams.get("id");
    let books;
    if (id) {
        books = await prisma.book.findUnique({
            where: { id }
        });
    } 
    else if (title) {
        books = await prisma.book.findMany({
            where: { title: { contains: title, mode: 'insensitive' } }
        });
    } 
    else {
        books = await prisma.book.findMany();
    }
    return Response.json(books);
}

export async function POST(req: Request) {
    const body = await req.json();
    const book = await prisma.book.create({ data: body });
    return Response.json(book);
}