import { PrismaClient } from '@prisma/client'
import { books } from './books'

const prisma = new PrismaClient()

async function main() {
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
          }
        }
    })
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