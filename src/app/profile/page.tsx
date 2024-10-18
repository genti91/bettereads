import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="grid items-center justify-items-center sm:px-20 sm:py-10 font-[family-name:var(--font-geist-sans)]">
        <Link href="/add_book">
            <Button >Add Book</Button>
        </Link>
    </div>
  );
}
