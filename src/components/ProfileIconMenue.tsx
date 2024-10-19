import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export default function ProfileIconMenue () {
  return (
    <Link href="/profile">
      <Avatar className="bg-slate-200 items-center justify-center">
        <AvatarImage src="https://cdn3.iconfinder.com/data/icons/toolbar-people/512/reader_acrobat_adobe_rss_news_google_feed-512.png" className="size-[70%]"/>
        <AvatarFallback>Profile</AvatarFallback>
      </Avatar>
    </Link>
  )
}