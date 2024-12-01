import Books from "@/components/sections/Books";
import Feed from "@/components/sections/Feed";
import FilterMenu from "@/components/sections/FilterMenu"
import { Separator } from "@/components/ui/separator";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";
import Challenge from "@/components/Challenge";

const fetchGenres = async () => {
  const response = await fetch(`${process.env.APP_URL}/api/genres`);
  if (response.ok) {
    const genresData = await response.json();
    return genresData.sort();
  } else {
    return [];
  }
};

export default async function Home({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  let genres = await fetchGenres();
  const filteredParams: Record<string, string> = Object.fromEntries(
    Object.entries(searchParams)
      .filter(([key]) => key !== "page")
      .map(([key, value]) => {
        return [key, value || ""];
      }).filter(([_, value]) => value !== "")
  );
  let currentPath = `/?${new URLSearchParams(filteredParams).toString()}`;
  if (Object.keys(filteredParams).length > 0) {
    currentPath += "&";
  }
  const session = await getServerSession(authOptions);
  return (
    <div className="flex justify-center">
      <div className={"flex px-10 py-10 justify-items-center sm:px-20 sm:py-10 font-[family-name:var(--font-geist-sans)] " + (session ? "" : "mr-80")}>
        <div className="flex gap-10">
          <div className="flex flex-col gap-7">
            <FilterMenu
              genres={genres}
              oldSelectedGenres={searchParams["genres_filter"] as string ?? ""}
              oldRating={parseInt(searchParams["rating_filter"] as string ?? "0")}
            />
            {session &&
              <>
                <Separator orientation="horizontal" />
                <Challenge userId={session.user.id} />
              </>
            }

          </div>
          <Separator orientation="vertical" />
          <Books
            pageNumber={searchParams["page"] ?? '1'}
            maxPerPage={4}
            search={searchParams["search_book"] ?? ""}
            genres={searchParams["genres_filter"] ?? ""}
            rating={parseInt(searchParams["rating_filter"] as string ?? "0")}
            path={currentPath}
            recommended={session?.user.id}
          />
          {session &&
            <>
              <Feed userId={session.user.id} />
            </>
          }
        </div>
      </div>
    </div >
  );
}
