import BookshelvesMenue from "@/components/BookshelvesMenue";
import Books from "@/components/sections/Books";
import { Separator } from "@/components/ui/separator";
import { User } from "@prisma/client";

async function getUserData(username: string) {
    try {
        const res = await fetch(`${process.env.APP_URL}/api/users/${username}`)
        return await res.json();
    } catch (error) {
        console.error(error)
        throw new Error("Error fetching user data")
    }
}

export default async function Bookshelves({ searchParams, params }: { searchParams: { [key: string]: string | string[] | undefined }, params: { username: string } }) {
  
    const filteredParams: Record<string, string> = Object.fromEntries(
        Object.entries(searchParams)
        .filter(([key]) => key !== "page")
        .map(([key, value]) => {
        return [key, value || ""];
        }).filter(([_, value]) => value !== "")
    );
    let currentPath = `profile/${params.username}/bookshelves?${new URLSearchParams(filteredParams).toString()}`;
    if (Object.keys(filteredParams).length > 0) {
        currentPath += "&";
    }

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
    <div className="flex xl:px-80 px-10 py-10 justify-items-center sm:px-20 sm:py-10 font-[family-name:var(--font-geist-sans)]">
        <div className="flex gap-10">
            <BookshelvesMenue userId={user.id} hideButtons/>
            <Separator orientation="vertical"/>
            <Books 
              pageNumber={searchParams["page"] ?? '1'}
              maxPerPage={4}
              search={searchParams["search_book"] ?? ""}
              shelfId={searchParams["shelf"] ?? ""}
              shlvesUserId={!searchParams["shelf"] ? user.id : undefined}
              path={currentPath}
              genres={""}
              rating={0}
            />
        </div>
    </div>
  );
}
