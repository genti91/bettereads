import Link from "next/link";
import SearchBar from "../SearchBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ProfileIconMenue from "../ProfileIconMenue";


export default function NavBar () {
  
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
            <ProfileIconMenue />
          </div>
        </div>
    </nav>
  )
}