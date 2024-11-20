import { prisma } from "@/lib/prisma";

export async function GET(_: Request, { params }: { params: { userId: string } }) {
    const { userId } = params;

    try {
        const readShelf = await prisma.shelf.findFirst({
            where: {
                userId,
                name: "Read",
            },
            include: {
                books: true,
            },
        });
        const amountCompleted = readShelf?.books.length || 0;
        let challenge = await prisma.challenge.findFirst({
            where: {
                userId: userId,
                createdAt: {
                    gte: new Date(new Date().getFullYear(), 0, 1),
                    lt: new Date(new Date().getFullYear() + 1, 0, 1),
                },
            },
        });
        let res = challenge ? {...challenge, amountCompleted} : {};
        return new Response(JSON.stringify(res), { status: 200 });
    } catch (error) {
      console.error("Error fetching challenge:", error);
      return new Response("Failed to fetch challenge", { status: 500 });
    }
  }

export async function POST(request: Request, { params }: { params: { userId: string } }) {
    const { userId } = params;
    const { amount } = await request.json();

    try {
        await prisma.challenge.create({
            data: {
                userId: userId,
                amount,
            },
        });
        return new Response("Challenge created", { status: 201 });
    } catch (error) {
        console.error("Error creating challenge:", error);
        return new Response("Failed to create challenge", { status: 500 });
    }
}

export async function PUT(request: Request) {
    const { amount, id } = await request.json();

    try {
        await prisma.challenge.update({
            where: {
                id: id,
            },
            data: {
                amount,
            },
        });
        return new Response("Challenge updated", { status: 200 });
    } catch (error) {
        console.error("Error updating challenge:", error);
        return new Response("Failed to update challenge", { status: 500 });
    }
}