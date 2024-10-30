import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const book = await prisma.book.findUnique({
        where: { id: params.id },
        include: { 
            genres: true, 
            reviews: { 
                include: { 
                    user: { select: { username: true } } 
                } 
            } 
        }
    })
    return Response.json({...book, genres: book?.genres.map(genre => genre.name)});
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const book = await prisma.book.delete({ where: { id: params.id } });
    return Response.json(book);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const body = await req.json();
    const currentBook = await prisma.book.findUnique({
        where: { id: params.id },
        include: { genres: true }
    });
    const currentGenres = currentBook?.genres.map(genre => genre.name) || [];
    const newGenres = body.genres || [];
    const genresToDisconnect = currentGenres.filter(genre => !newGenres.includes(genre));
    const book = await prisma.book.update({
        where: { id: params.id },
        data: {
            ...body,
            genres: {
                connect: newGenres.map((genreName: string) => ({ name: genreName })),
                disconnect: genresToDisconnect.map((genreName: string) => ({ name: genreName })),
            }
        }
    });
    return Response.json(book);
}