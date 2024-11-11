import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { username: string } }) {
    const users = await prisma.user.findUnique({
        where: { username: params.username },
        include: { 
            reviews: {
                include: { 
                    Book: true,
                    user: true
                }
            } 
        }
    });
    return Response.json(users);
}