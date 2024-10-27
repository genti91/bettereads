import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export default async function Page() {
  const session = await getServerSession(authOptions)

  if (!session) {
    // Si no hay sesión, redirige al usuario a la página de autenticación
    return (
      <div className="grid items-center justify-items-center sm:px-20 py-10 font-[family-name:var(--font-geist-sans)]">
        <p>No tienes acceso a esta página. Por favor, inicia sesión.</p>
        <Link href="/auth">
          <Button>Ir a la página de inicio de sesión</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid items-center justify-items-center sm:px-20 py-10 font-[family-name:var(--font-geist-sans)]">
      <div className="flex gap-4">
        <Link href="/add_book">
          <Button>Add Book</Button>
        </Link>
        <Link href="/my_books">
          <Button>My Books</Button>
        </Link>
      </div>
    </div>
  )
}