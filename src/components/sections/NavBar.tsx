import Link from "next/link";
import SearchBar from "../SearchBar";
import ProfileIconMenue from "../ProfileIconMenue";
import { Button } from "@/components/ui/button"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"

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
          <SearchBar />
          {session ?
            <ProfileIconMenue profileImage={session?.user.image ?? ""} /> :
            <Link href="/auth/login">
              <Button>Log In</Button>
            </Link>
          }
        </div>
      </div>
    </nav>
  )
}