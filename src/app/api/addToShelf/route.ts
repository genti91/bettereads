import { prisma } from "@/lib/prisma";
import { ActivityType, ShelfType } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { bookId, shelfId, userId } = await req.json();

    if (!bookId || !shelfId || !userId) {
        return NextResponse.json({ error: "Missing bookId, shelfId or userId" }, { status: 400 });
    }

    try {
        const updatedShelf = await prisma.shelf.update({
            where: { id: shelfId },
            data: {
                books: {
                    connect: { id: bookId }
                }
            }
        });
        if (updatedShelf.type === ShelfType.DEFAULT) {
            await prisma.activity.create({
                data: {
                    type: ActivityType.ADD_TO_SHELF,
                    userId,
                    bookId,
                    shelfId: shelfId
                }
            });
        }
        return NextResponse.json(updatedShelf, { status: 200 });
    } catch (error) {
        console.error("Error adding book to shelf:", error);
        return NextResponse.json({ error: "Error adding book to shelf" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const { bookId, shelfId, userId } = await req.json();

    if (!bookId || !shelfId || !userId) {
        return NextResponse.json({ error: "Missing bookId, shelfId or userId" }, { status: 400 });
    }

    try {
        const updatedShelf = await prisma.shelf.update({
            where: { id: shelfId },
            data: {
                books: {
                    disconnect: { id: bookId }
                }
            }
        });
        if (updatedShelf.type === ShelfType.DEFAULT) {
            await prisma.activity.deleteMany({
                where: {
                    type: ActivityType.ADD_TO_SHELF,
                    userId,
                    bookId,
                    shelfId: shelfId
                }
            });
        }
        return NextResponse.json(updatedShelf, { status: 200 });
    } catch (error) {
        console.error("Error removing book from shelf:", error);
        return NextResponse.json({ error: "Error removing book from shelf" }, { status: 500 });
    }
}