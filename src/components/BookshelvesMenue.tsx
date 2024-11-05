import { Separator } from "@/components/ui/separator";
import { Button } from "./ui/button";
import Link from "next/link";
import { Input } from "./ui/input";
import AddShelf from "./AddShelf";

export default function BookshelvesMenue() {
  return (
    <div className="flex flex-col gap-3">
        <h1 className="text-xl font-bold">Bookshelves</h1>
        <div className="flex flex-col gap-1">
            <Link href="/bookshelves">
                <p className="">All (5)</p>
            </Link>
            <Link href="/bookshelves?shelf=read">
                <p className="">Read (2)</p>
            </Link>
            <Link href="/bookshelves?shelf=to_read">
                <p className="">To Read (1)</p>
            </Link>
            <Link href="/bookshelves?shelf=reading">
                <p className="">Reading (0)</p>
            </Link>
            <Separator />
            <Link href="/bookshelves?shelf=custom">
                <p className="">Custom (3)</p>
            </Link>
            <Separator className="mb-2"/>
            <AddShelf />
            <Link href="/edit_shelves">
                <Button className="h-7 w-full">Edit Shelves</Button>
            </Link>
        </div>
    </div>
  );
}
