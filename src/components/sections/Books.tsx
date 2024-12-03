import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Book } from "@prisma/client";
import { StarIcon } from "@radix-ui/react-icons";
import Link from "next/link";

interface BooksProps {
    pageNumber: string | string[],
    maxPerPage: number,
    search: string | string[],
    shelfId?: string | string[],
    shlvesUserId?: string,
    path?: string,
    genres: string | string[],
    rating: number,
    recommended?: string
}

const MAX_PAGINATION = 5;

async function getBooks(search: string, genres: string, rating: number, shelfId?: string, shlvesUserId?: string) {
    const genresForFilter: string[] = genres.split(",");
    const queryParams = new URLSearchParams();
    if (search) queryParams.append("title", search);
    if (shelfId) queryParams.append("shelf", shelfId);
    if (shlvesUserId) queryParams.append("all_shelves", shlvesUserId);
    if (rating > 0) queryParams.append("rating", rating.toString());
    if (genres) {
        genresForFilter.forEach(genre => {
            queryParams.append("by_genres", genre);
        });
    }
    const url = `${process.env.APP_URL}/api/books${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
    const response = await fetch(url, { cache: "no-store" });
    return response.json();
}

async function getRecomendedBooks(userId: string) {
    const response = await fetch(`${process.env.APP_URL}/api/recommendedBooks/${userId}`, { cache: "no-store" });
    return response.json();
}

export default async function Books({ pageNumber, maxPerPage, search, shelfId, shlvesUserId, path = "", genres, rating, recommended }: BooksProps) {
    let books = [];
    if ( recommended && !search && !genres && !rating && !shelfId && !shlvesUserId) {
        books = await getRecomendedBooks(recommended);
    } else {
        books = await getBooks(search as string, genres as string, rating, shelfId as string, shlvesUserId);
    }
    const currentPage = Number(pageNumber);
    const start = (currentPage - 1) * maxPerPage;
    const end = start + maxPerPage;
    const paginatedBooks = books.slice(start, end);
    const maxPages = Math.ceil(books.length / maxPerPage);

    function getPaginationRange() {
        const range = [];

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

    const paginationRange = getPaginationRange();

    return (
        <div className="flex flex-col gap-10 max-w-2xl">
            <div>
                {paginatedBooks.map((book: Book) => (
                    <Link href={`/book/${book.id}`} passHref key={book.id}>
                        <div key={book.id} className="flex flex-row justify-between p-4 border-b-2 ">
                            <div className="flex flex-row">
                                <img src={book.imageUrl} alt={book.title} className="w-24 h-32" />
                                <div className="flex flex-col ml-4">
                                    <div className="flex flex-row gap-2 items-center">
                                        <h2 className="text-xl font-bold">{book.title}</h2>
                                        {book.rating > 0 &&
                                            <div className="flex gap-1 items-center">
                                                <StarIcon className="h-4 w-4"/>
                                                <p>{book.rating % 1 === 0 ? book.rating.toFixed(0) : book.rating.toFixed(1)}</p>
                                            </div>
                                        }
                                    </div>
                                    <p className="text-m">{book.author}</p>
                                    <p className="text-sm">{book.description}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
                {paginatedBooks.length < maxPerPage && (
                    <>
                        {Array(maxPerPage - paginatedBooks.length).fill(0).map((_, index) => (
                            <div key={index} className="flex flex-row p-4 border-b-2 border-white ">
                                <div className="flex flex-row">
                                    <div className="w-24 h-32 " />
                                    <div className="flex flex-col ml-4"/>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>

            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href={currentPage === 1 ? "#" : `${path ? path : "?"}page=${currentPage - 1}`} />
                    </PaginationItem>

                    {!paginationRange.includes(1) && <PaginationEllipsis />}

                    {paginationRange.map((number, index) => {
                        const page = number;
                        return (
                            <PaginationItem key={index}>
                                <PaginationLink href={currentPage === page ? "#" : `${path ? path : "?"}page=${page}`} isActive={currentPage === page}>
                                    {number}
                                </PaginationLink>
                            </PaginationItem>
                        );
                    })}

                    {!paginationRange.includes(maxPages) && < PaginationEllipsis />}
                    <PaginationItem>
                        <PaginationNext href={currentPage === maxPages ? "#" : `${path ? path : "?"}page=${currentPage + 1}`} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}