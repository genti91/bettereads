import { Shelve as PrismaShelve, ShelfType } from "@prisma/client";
import Link from "next/link";
import { Separator } from "../ui/separator";

interface Shelve extends PrismaShelve {
  bookCount: number;
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

export default async function Shelves({ userId, showAll, separate }: { userId: string, showAll?: boolean, separate?: boolean }) {
  let defaultShelves: Shelve[];
  let customShelves: Shelve[];
  try {
      let shelves = await getShelves(userId);
      defaultShelves = shelves.filter((shelve: Shelve) => shelve.type === ShelfType.DEFAULT);
      customShelves = shelves.filter((shelve: Shelve) => shelve.type === ShelfType.CUSTOM);
  } catch (error) {
      console.error(error);
      return <div>Failed to fetch shelves</div>;
  }
  console.log(defaultShelves);
  return (
    <>
      {showAll && (
        <Link href={`/bookshelves`} className="text-nowrap">
          All ({[...defaultShelves, ...customShelves].reduce((acc, shelve) => acc + shelve.bookCount, 0)})
        </Link>
      )}
      {defaultShelves.map((shelve: Shelve) => (
        <Link key={shelve.id} href={`/bookshelves?shelf=${shelve.id}`} className="text-nowrap">
          {shelve.name} ({shelve.bookCount})
        </Link>
      ))}
      {(separate && customShelves.length > 0) && <Separator />}
      {customShelves.map((shelve: Shelve) => (
        <Link key={shelve.id} href={`/bookshelves?shelf=${shelve.id}`} className="text-nowrap">
          {shelve.name} ({shelve.bookCount})
        </Link>
      ))}
    </>
  )
}