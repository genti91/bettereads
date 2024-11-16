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
import Shelves from "@/components/sections/Shelves";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReviewCard from "@/components/ReviewCard";

async function getUserData(username: string) {
  try {
    const res = await fetch(`${process.env.APP_URL}/api/users/${username}`, { cache: "no-store" });
    const user = await res.json();
    return user;
  } catch (error) {
    console.error(error)
    throw new Error("Error fetching user data")
  }
}


export default async function Page() {
  const session = await getServerSession(authOptions)

  if (!session) {
    // Si no hay sesión, redirige al usuario a la página de autenticación
    return (
      <div className="grid items-center justify-items-center sm:px-20 py-10 font-[family-name:var(--font-geist-sans)]">
        <p>You don't have access to this page. Please Log In.</p>
        <Link href="/auth/login">
          <Button>Log In</Button>
        </Link>
      </div>
    )
  }

  let user: any;
    try {
        user = await getUserData(session.user.email ?? "")
    } catch (error) {
        console.error(error)
        return (
            <div className="flex justify-center items-center h-96">
                <h1 className="text-3xl">User not found</h1>
            </div>
        )
    }

  return (
    <div className="grid xl:px-80 lg:py-20 px-10 py-10 font-[family-name:var(--font-geist-sans)]">
      <div className="flex gap-10 flex-wrap">
        <Avatar className="h-52 w-52">
          <AvatarImage src={session.user.image ?? ""}/>
          <AvatarFallback className="text-7xl">{session.user.name?.charAt(0)}</AvatarFallback>
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

          <Link href="/bookshelves">
            <h2 className="text-xl font-bold underline">Bookshelves:</h2>
          </Link>
          <div className="flex gap-6 flex-row flex-wrap">
            <Shelves userId={session.user.id} path="/bookshelves" />
          </div>

          <Separator />
          
          <h2 className="text-xl font-bold underline">Reviews:</h2>
          <ScrollArea className="h-[500px] w-full px-4">
            <div className="flex gap-6 flex-col">
              {user.reviews.map((review: any) => (
                <ReviewCard key={review.id} review={review}/>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}