import { PrismaClient } from '@prisma/client'
import { books } from './books'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      username: "giovinco",
      password: "asdf1234",
      name: "Sebastian",
      picture: "https://github.com/shadcn.png"
    },
  });


  for (let book of books) {
    await prisma.book.upsert({
        where: { id: book.id },
        update: {},
        create: {
          ...book,
          genres: {
            connectOrCreate: book.genres.map((genreName: string) => ({
              where: { name: genreName },
              create: { name: genreName }
            }))
          },
          userId: user.id
        }
    });
  }
}

main()
  .catch( (e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => {
    prisma.$disconnect()
  })