import { prisma } from "@/lib/prisma";

export async function GET(_: Request, { params }: { params: { userId: string } }) {
    const { userId } = params;

    try {
      const userGenres = await prisma.genre.findMany({
        where: {
          books: {
            some: {
              shelves: {
                some: {
                  userId: userId,
                },
              },
            },
          },
        },
        select: {
          id: true,
        },
      });
  
      const genreIds = userGenres.map((genre) => genre.id);
  
      const genreMatchingBooks = await prisma.book.findMany({
        where: {
          genres: {
            some: {
              id: {
                in: genreIds,
              },
            },
          },
        },
        include: {
          genres: true,
        },
        orderBy: {
          rating: "desc",
        },
      });
  
      const otherBooks = await prisma.book.findMany({
        where: {
          genres: {
            none: {
              id: {
                in: genreIds,
              },
            },
          },
        },
        include: {
          genres: true,
        },
      });
  
      const books = [...genreMatchingBooks, ...otherBooks];
  
      return new Response(JSON.stringify(books), { status: 200 });
    } catch (error) {
      console.error("Error fetching books:", error);
      return new Response("Failed to fetch books", { status: 500 });
    }
  }