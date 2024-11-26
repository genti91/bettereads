import Link from "next/link";
import SearchBar from "../SearchBar";
import ProfileIconMenue from "../ProfileIconMenue";
import LeaderBoards from "../sections/LeaderBoards";
import { Button } from "@/components/ui/button"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Separator } from "../ui/separator";


export default async function NavBar() {
  const session = await getServerSession(authOptions)
  return (
    <nav className="flex p-3 border-b-2">
      <div className="container flex flex-row flex-wrap justify-between items-center px-4">
        <Link href="/">
          <div className="flex items-center">
            <h1 className="text-3xl font-thin">better</h1>
            <h1 className="text-3xl font-bold text-green-500">reads</h1>
          </div>
        </Link>
        <div className="flex items-center gap-6">
          <div className="flex flex-row">
            <div className="flex gap-1">
              {session &&
                <>
                  <Link href="/groups">
                    <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border-none rounded-sm ">
                        Groups
                    </button>
                  </Link>
                  <Separator orientation="vertical" />
                </>
              }
              <LeaderBoards/>
            </div>
          </div>
          <SearchBar />
          {session ?
            <div className="flex gap-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Link href="/friends">
                      <Avatar className="bg-[#f4f4f4c9] items-center justify-center cursor-pointer">
                        <AvatarImage src="/images/friends.png" className="w-7 h-[26px]"/>
                        <AvatarFallback>P</AvatarFallback>
                      </Avatar>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Friends</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <ProfileIconMenue profileImage={session?.user.image ?? ""} name={session?.user.name ?? ""}/>
            </div>
            :
            <Link href="/auth/login">
              <Button>Log In</Button>
            </Link>
          }
        </div>
      </div>
    </nav>
  )
}