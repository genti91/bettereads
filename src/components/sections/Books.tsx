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

const MAX_PAGINATION = 3;
  
async function getBooks(search:string) {
    const response = await fetch(
        `${process.env.APP_URL}/api/books${search ? `?title=${search}` : ""}`,
        { cache: "no-store" }
    );
    return response.json();
}

export default async function Books ({ pageNumber, maxPerPage, search }:any) {
    const books = await getBooks(search);
    const currentPage = Number(pageNumber);
    const start = (currentPage - 1) * maxPerPage;
    const end = start + maxPerPage;
    const paginatedBooks = books.slice(start, end);
    const maxPages = Math.ceil(books.length / maxPerPage);
    
    function getPaginationRange() {
        const range = [];
        for (let i = 1; i <= maxPages; i++) {
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

    return (
      <div className="flex flex-col gap-10">
        <div>
            {paginatedBooks.map((book:any) => (
                <Link href={`/book/${book.id}`} passHref>
                    <div key={book.id} className="flex flex-row justify-between p-4 border-b-2 ">
                        <div className="flex flex-row">
                            <img src={book.imageUrl} alt={book.title} className="w-24 h-32" />
                            <div className="flex flex-col ml-4">
                                <h2 className="text-xl font-bold">{book.title}</h2>
                                <p className="text-m">{book.author}</p>
                                <p className="text-sm">{book.description}</p>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>

        <Pagination>
            <PaginationContent>
                <PaginationItem>
                <PaginationPrevious href={currentPage === 1 ? "#" : `/?page=${currentPage - 1}`} />
                </PaginationItem>
                
                {getPaginationRange().map((_, index) => {
                    const page = index + 1;
                    return (
                        <PaginationItem key={index}>
                        <PaginationLink href={currentPage === page ? "#" : `/?page=${page}`} isActive={currentPage === page}>
                            {index + 1}
                        </PaginationLink>
                        </PaginationItem>
                    );
                })}


                <PaginationItem>
                <PaginationNext href={currentPage === maxPages ? "#" : `/?page=${currentPage + 1}`} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
      </div>
    )
  }