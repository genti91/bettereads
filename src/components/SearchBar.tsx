"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Input } from "./ui/input";

export default function SearchBar () {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        const params = new URLSearchParams(searchParams);
        if (value) {
            params.set("search_book", value);
        } else {
            params.delete("search_book");
        }
        replace(`${pathname}?${params.toString()}`);
    }

  return (
    <Input placeholder="Search books" onChange={(e) => handleChange(e)} />
  )
}