import { ShelfType } from "@prisma/client";
import Link from "next/link";
import { Separator } from "../ui/separator";


interface Shelf {
  id: string;
  name: string;
  type: ShelfType;
  bookCount: number;
  books: [{ id: string }];
}

async function getShelves(userId: string) {
  const response = await fetch(
      `${process.env.APP_URL}/api/bookshelves?userId=${userId}`,
      { cache: "no-store" }
  );
  if (!response.ok) {
      throw new Error("Failed to fetch shelves");
  }
  return response.json();
}

export default async function Shelves({ userId, showAll, separate, path }: { userId: string, showAll?: boolean, separate?: boolean, path?: string }) {
  let defaultShelves: Shelf[];
  let customShelves: Shelf[];
  try {
      let shelves = await getShelves(userId);
      defaultShelves = shelves.filter((shelve: Shelf) => shelve.type === ShelfType.DEFAULT);
      customShelves = shelves.filter((shelve: Shelf) => shelve.type === ShelfType.CUSTOM);
  } catch (error) {
      console.error(error);
      return <div>Failed to fetch shelves</div>;
  }

  let allBooks = new Set();
  defaultShelves.forEach((shelve: Shelf) => {
      shelve.books.forEach((book) => allBooks.add(book.id));
  });
  customShelves.forEach((shelve: Shelf) => {
      shelve.books.forEach((book) => allBooks.add(book.id));
  });

  return (
    <>
      {showAll && (
        <Link href={{query: {shelf: ""}}} className="text-nowrap">
          All ({allBooks.size})
        </Link>
      )}
      {defaultShelves.map((shelve: Shelf) => (
        <Link key={shelve.id} href={{pathname: path, query: {shelf: shelve.id}}} className="text-nowrap">
          {shelve.name} ({shelve.bookCount})
        </Link>
      ))}
      {(separate && customShelves.length > 0) && <Separator />}
      {customShelves.map((shelve: Shelf) => (
        <Link key={shelve.id} href={{pathname: path, query: {shelf: shelve.id}}} className="text-nowrap">
          {shelve.name} ({shelve.bookCount})
        </Link>
      ))}
    </>
  )
}