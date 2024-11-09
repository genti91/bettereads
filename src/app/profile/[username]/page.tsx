import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import Shelves from "@/components/sections/Shelves";
import { User } from "@prisma/client";
import FollowBackButton from "@/components/FollowBackButton";

async function getUserData(username: string) {
  try {
    const res = await fetch(`${process.env.APP_URL}/api/users/${username}`)
    return await res.json();
  } catch (error) {
    console.error(error)
    throw new Error("Error fetching user data")
  }
}


export default async function Page({ params }: { params: { username: string } }) {
    let user: User;
    try {
        user = await getUserData(params.username)
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
          <AvatarImage src={user.picture ?? ""}/>
          <AvatarFallback className="text-7xl">{user.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-4 w-2/3">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <FollowBackButton userId={user.id} followerId={user.id} title="Follow"/>
          </div>
          <Separator />
          <h2 className="text-xl font-bold underline">Bookshelves:</h2>
          <div className="flex gap-6 flex-row flex-wrap">
            <Shelves userId={user.id} />
          </div>
          <Separator />
          <h2 className="text-xl font-bold underline">Reviews:</h2>
          <div className="flex gap-6 flex-row flex-wrap">
            
          </div>
        </div>
      </div>
    </div>
  )
}