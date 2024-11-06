import Books from "@/components/sections/Books";
import FilterMenu from "@/components/sections/FilterMenu"
import { Separator } from "@/components/ui/separator";

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
  return (
    <div className="flex xl:px-80 px-10 py-10 justify-items-center sm:px-20 sm:py-10 font-[family-name:var(--font-geist-sans)]">
      <div className="flex gap-10">
        <FilterMenu 
          genres={genres}
          oldSelectedGenres={searchParams["genres_filter"] as string ?? ""} 
          oldRating={parseInt(searchParams["rating_filter"] as string ?? "0")}
        />
        <Separator orientation="vertical" />
        <Books
          pageNumber={searchParams["page"] ?? '1'}
          maxPerPage={4}
          search={searchParams["search_book"] ?? ""}
          genres={searchParams["genres_filter"] ?? ""}
          rating={parseInt(searchParams["rating_filter"] as string ?? "0")}
          path={currentPath}
        />
      </div>
    </div>
  );
}
