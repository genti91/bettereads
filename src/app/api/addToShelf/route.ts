import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { bookId, shelfId } = await req.json();

    if (!bookId || !shelfId) {
        return NextResponse.json({ error: "Missing bookId or shelfId" }, { status: 400 });
    }

    try {
        const updatedShelf = await prisma.shelve.update({
            where: { id: shelfId },
            data: {
                books: {
                    connect: { id: bookId }
                }
            }
        });

        return NextResponse.json(updatedShelf, { status: 200 });
    } catch (error) {
        console.error("Error adding book to shelf:", error);
        return NextResponse.json({ error: "Error adding book to shelf" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const { bookId, shelfId } = await req.json();

    if (!bookId || !shelfId) {
        return NextResponse.json({ error: "Missing bookId or shelfId" }, { status: 400 });
    }

    try {
        const updatedShelf = await prisma.shelve.update({
            where: { id: shelfId },
            data: {
                books: {
                    disconnect: { id: bookId }
                }
            }
        });

        return NextResponse.json(updatedShelf, { status: 200 });
    } catch (error) {
        console.error("Error removing book from shelf:", error);
        return NextResponse.json({ error: "Error removing book from shelf" }, { status: 500 });
    }
}