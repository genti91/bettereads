import { Separator } from "@/components/ui/separator";
import { Button } from "./ui/button";
import Link from "next/link";
import { Input } from "./ui/input";
import AddShelf from "./AddShelf";
import Shelves from "./sections/Shelves";

export default function BookshelvesMenue({userId, hideButtons}: {userId: string, hideButtons: boolean}) {
  return (
    <div className="flex flex-col gap-3">
        <h1 className="text-xl font-bold">Bookshelves</h1>
        <div className="flex flex-col gap-1">
            <Shelves userId={userId} showAll separate/>
            {!hideButtons &&
              <>
                <Separator className="mb-2"/>
                <AddShelf userId={userId} />
                <Link href="/edit_shelves">
                    <Button className="h-7 w-full">Edit Shelves</Button>
                </Link>
              </>
            }
        </div>
    </div>
  );
}
