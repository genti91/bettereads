import { PrismaClient } from '@prisma/client'
import { books } from './books'


const USER_ID_DEFAULT = 1;
const prisma = new PrismaClient()

async function main() {
  const _user = await prisma.user.create({
    data: {
      username: "giovinco",
      password: "asdf1234"
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
          userId: USER_ID_DEFAULT,
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