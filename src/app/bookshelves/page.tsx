import BookshelvesMenue from "@/components/BookshelvesMenue";
import Books from "@/components/sections/Books";
import { Separator } from "@/components/ui/separator";

export default function Bookshelves({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  return (
    <div className="flex xl:px-80 px-10 py-10 justify-items-center sm:px-20 sm:py-10 font-[family-name:var(--font-geist-sans)]">
        <div className="flex gap-10">
            <BookshelvesMenue/>
            <Separator orientation="vertical"/>
            <Books pageNumber={searchParams["page"] ?? '1'} maxPerPage={4} search={searchParams["search_book"] ?? ""} />
        </div>
    </div>
  );
}
