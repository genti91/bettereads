import Books from "@/components/sections/Books";

export default function Home({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  return (
    <div className="grid items-center justify-items-center sm:px-20 sm:py-10 font-[family-name:var(--font-geist-sans)]">
      <Books pageNumber={searchParams["page"] ?? '1'} maxPerPage={4} search={searchParams["search_book"]} />
    </div>
  );
}
