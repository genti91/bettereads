import BookshelvesMenue from "@/components/BookshelvesMenue";
import Books from "@/components/sections/Books";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShelfType, Shelve as PrismaShelve } from "@prisma/client";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import EditShelf from "@/components/EditShelf";

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

export default async function EditShelves({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return <div>Unauthorized</div>;
    }
    let defaultShelves: Shelve[];
    let customShelves: Shelve[];
    try {
        let shelves = await getShelves(session.user.id);
        defaultShelves = shelves.filter((shelve: Shelve) => shelve.type === ShelfType.DEFAULT);
        customShelves = shelves.filter((shelve: Shelve) => shelve.type === ShelfType.CUSTOM);
    } catch (error) {
        console.error(error);
        return <div>Failed to fetch shelves</div>;
    }
  return (
    <div className="flex xl:px-80 px-10 py-10 justify-items-center sm:px-20 sm:py-10 font-[family-name:var(--font-geist-sans)]">
        <div className="flex flex-col gap-10 w-full">
            <h2 className="text-2xl font-bold">My Shelves</h2>
            <div className="flex flex-col w-2/3 self-center gap-2">
                {customShelves.length === 0 && <div>No custom shelves</div>}
                {[...customShelves].map( (shelve: Shelve) => (
                    <>
                        <Separator />
                        <div className="flex justify-between">
                            <h3 className="text-xl font-bold">{shelve.name}</h3>
                            <div className="flex gap-2 mt-1">
                                <EditShelf shelf={shelve}/>
                            </div>
                        </div>
                    </>
                ))}
                <Separator />
            </div>
            <Link href="/bookshelves" className="self-end">
                <Button>Go Back</Button>
            </Link>
        </div>
    </div>
  );
}
