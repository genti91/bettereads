import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="grid items-center justify-items-center sm:px-20 py-10 font-[family-name:var(--font-geist-sans)]">
        <div className="flex gap-4">
          <Link href="/add_book">
              <Button >Add Book</Button>
          </Link>
          <Link href="/my_books">
              <Button >My Books</Button>
          </Link>
        </div>
    </div>
  );
}
