import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import AddFriends from "@/components/AddFriends";

export default async function Friends({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  
  return (
    <div className="grid xl:px-80 px-10 py-10 justify-items-center sm:px-20 sm:py-10 font-[family-name:var(--font-geist-sans)]">
      <div className="flex lg:gap-14 gap-10">
        <div className="flex flex-col gap-4">
            <h1 className="text-xl">Friends you follow</h1>
            <div className="flex flex-col gap-4">
                {Array.from({length: 5}, (_, i) => (
                    <div className="flex items-center gap-4">
                        <Avatar className="bg-slate-200 items-center justify-center hover:bg-slate-100">
                            <AvatarImage src={"https://github.com/shadcn.png"}/>
                            <AvatarFallback>P</AvatarFallback>
                        </Avatar>
                        <div>
                        <h2>John Doe</h2>
                        
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <Separator orientation="vertical" />
        <div className="flex flex-col gap-4">
            <h1 className="text-xl">Peopel that follow you</h1>
            <div className="flex flex-col gap-4">
                {Array.from({length: 5}, (_, i) => (
                    <div className="flex items-center gap-4">
                        <Avatar className="bg-slate-200 items-center justify-center hover:bg-slate-100">
                            <AvatarImage src={"https://github.com/shadcn.png"}/>
                            <AvatarFallback>P</AvatarFallback>
                        </Avatar>
                        <div>
                            <h2>John Doe</h2>
                            <Button className="h-7">Follow Back</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <Separator orientation="vertical" />
        <div className="flex flex-col gap-4">
            <h1 className="text-xl">Search for new friends</h1>
            <AddFriends/>
        </div>
      </div>
    </div>
  );
}
