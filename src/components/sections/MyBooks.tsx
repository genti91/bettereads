import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import Link from "next/link";
import { Button } from "../ui/button";
import DeleteBookButton from "../DeleteBookButton";

const MAX_PAGINATION = 5;

async function getBooks(search: string) {
  const response = await fetch(
      `${process.env.APP_URL}/api/books${search ? `?title=${search}` : ""}`,
      { cache: "no-store" }
  );
  return response.json();
}

export default async function MyBooks({ pageNumber, maxPerPage, search }: any) {
  const books = await getBooks(search);
  const currentPage = Number(pageNumber);
  const start = (currentPage - 1) * maxPerPage;
  const end = start + maxPerPage;
  const paginatedBooks = books.slice(start, end);
  const maxPages = Math.ceil(books.length / maxPerPage);

  function getPaginationRange() {
      let range = [];

      const a = Math.max(1, Math.min(currentPage - 1, maxPages - MAX_PAGINATION));
      const b = Math.min(a + MAX_PAGINATION, maxPages);

      for (let i = a; i <= b; i++) {
          range.push(i);
      }

      return range;
  }

  if (books.length === 0) {
      return (
          <div className="flex justify-center items-center h-96">
              <h1 className="text-3xl">No books found</h1>
          </div>
      );
  }

  let paginationRange = getPaginationRange();

  return (
      <div className="flex flex-col gap-10">
          <div>
              {paginatedBooks.map((book: any, index:number) => (
                <div key={book.id} className="flex flex-row justify-between p-4 border-b-2 ">
                    <div className="flex w-full justify-between gap-4">
                      <Link href={`/book/${book.id}`} passHref key={book.id}>
                        <div className="flex">
                          <img src={book.imageUrl} alt={book.title} className="w-24 h-32" />
                          <div className="flex flex-col ml-4">
                              <h2 className="text-xl font-bold">{book.title}</h2>
                              <p className="text-m">{book.author}</p>
                              <p className="text-sm">{book.description}</p>
                          </div>
                        </div>
                        </Link>
                        <div className="flex flex-col gap-4">
                          <Link className="w-full" href={`edit_book/${book.id}/?page=${currentPage}`}>
                            <Button className=" w-full">Edit</Button>
                          </Link>
                          <DeleteBookButton bookId={book.id} />
                        </div>
                    </div>
                </div>
              ))}
          </div>

          <Pagination>
              <PaginationContent>
                  <PaginationItem>
                      <PaginationPrevious href={currentPage === 1 ? "#" : `my_books/?page=${currentPage - 1}`} />
                  </PaginationItem>

                  {!paginationRange.includes(1) && <PaginationEllipsis />}

                  {paginationRange.map((number, index) => {
                      const page = number;
                      return (
                          <PaginationItem key={index}>
                              <PaginationLink href={currentPage === page ? "#" : `my_books/?page=${page}`} isActive={currentPage === page}>
                                  {number}
                              </PaginationLink>
                          </PaginationItem>
                      );
                  })}

                  {!paginationRange.includes(maxPages) && < PaginationEllipsis />}
                  <PaginationItem>
                      <PaginationNext href={currentPage === maxPages ? "#" : `my_books/?page=${currentPage + 1}`} />
                  </PaginationItem>
              </PaginationContent>
          </Pagination>
      </div>
  )
}