import BookshelvesMenue from "@/components/BookshelvesMenue";
import Books from "@/components/sections/Books";
import { Separator } from "@/components/ui/separator";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";

export default async function Bookshelves({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return (
      <div className="grid items-center justify-items-center sm:px-20 py-10 font-[family-name:var(--font-geist-sans)]">
        <p>No tienes acceso a esta página. Por favor, inicia sesión.</p>
        <Link href="/auth/login">
          <Button>Ir a la página de inicio de sesión</Button>
        </Link>
      </div>
    )
  }
  const filteredParams: Record<string, string> = Object.fromEntries(
    Object.entries(searchParams)
    .filter(([key]) => key !== "page")
    .map(([key, value]) => {
      return [key, value || ""];
    }).filter(([_, value]) => value !== "")
  );
  let currentPath = `/bookshelves?${new URLSearchParams(filteredParams).toString()}`;
  if (Object.keys(filteredParams).length > 0) {
    currentPath += "&";
  }

  return (
    <div className="flex xl:px-80 px-10 py-10 justify-items-center sm:px-20 sm:py-10 font-[family-name:var(--font-geist-sans)]">
        <div className="flex gap-10">
            <BookshelvesMenue userId={session.user.id}/>
            <Separator orientation="vertical"/>
            <Books 
              pageNumber={searchParams["page"] ?? '1'}
              maxPerPage={4}
              search={searchParams["search_book"] ?? ""}
              shelfId={searchParams["shelf"] ?? ""}
              shlvesUserId={!searchParams["shelf"] ? session.user.id : undefined}
              path={currentPath}
              genres={""}
              rating={0}
            />
        </div>
    </div>
  );
}
