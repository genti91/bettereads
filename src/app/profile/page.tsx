import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"


export default async function Page() {
  const session = await getServerSession(authOptions)

  if (!session) {
    // Si no hay sesión, redirige al usuario a la página de autenticación
    return (
      <div className="grid items-center justify-items-center sm:px-20 py-10 font-[family-name:var(--font-geist-sans)]">
        <p>No tienes acceso a esta página. Por favor, inicia sesión.</p>
        <Link href="/auth/login">
          <Button>Ir a la página de inicio de sesión</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid xl:px-80 lg:py-20 px-10 py-10 font-[family-name:var(--font-geist-sans)]">
      <div className="flex gap-10 flex-wrap">
        <Avatar className="h-52 w-52">
          <AvatarImage src={session.user.image ?? ""}/>
          <AvatarFallback>{session.user.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-4 w-2/3">
          <h1 className="text-3xl font-bold">{session.user.name}</h1>
          <Separator />
          <div className="flex gap-2 flex-wrap">
            <Link href="/my_books">
              <Button>My Books</Button>
            </Link>
            <Link href="/add_book">
              <Button>Add Book</Button>
            </Link>
          </div>
          <Separator />
            <h2 className="text-xl font-bold underline">Bookshelves:</h2>
            <div className="flex gap-6 flex-row flex-wrap">
              <Link href="/bookshelves?shelf=read" className="text-nowrap">
                Read (2)
              </Link>
              <Link href="/bookshelves?shelf=to_read" className="text-nowrap">
                To Read (1)
              </Link>
              <Link href="/bookshelves?shelf=reading" className="text-nowrap">
                Reading (0)
              </Link>
              <Link href="/bookshelves?shelf=custom" className="text-nowrap">
                Custom (3)
              </Link>
            </div>
        </div>
      </div>
    </div>
  )
}