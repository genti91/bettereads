import MyBooks from "@/components/sections/MyBooks";

export default function MyBooksPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  return (
    <div className="grid items-center justify-items-center sm:px-20 sm:py-10 font-[family-name:var(--font-geist-sans)]">
      <MyBooks pageNumber={searchParams["page"] ?? '1'} maxPerPage={4} search={searchParams["search_book"] ?? ""} />
    </div>
  );
}
