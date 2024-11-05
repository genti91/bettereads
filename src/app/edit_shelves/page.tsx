import BookshelvesMenue from "@/components/BookshelvesMenue";
import Books from "@/components/sections/Books";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function EditShelves({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  return (
    <div className="flex xl:px-80 px-10 py-10 justify-items-center sm:px-20 sm:py-10 font-[family-name:var(--font-geist-sans)]">
        <div className="flex flex-col gap-10 w-full">
            <h2 className="text-2xl font-bold">My Shelves</h2>
            <div className="flex flex-col w-2/3 self-center gap-2">
                {Array.from({length: 5}, (_, i) => (
                    <>
                        <Separator />
                        <div className="flex justify-between">
                            <h3 className="text-xl font-bold">Custom 1</h3>
                            <div className="flex gap-2 mt-1">
                                <TrashIcon className="h-5 w-5 cursor-pointer" />
                                <Pencil1Icon className="h-5 w-5 cursor-pointer" />
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
