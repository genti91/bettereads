"use client"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { RatingFilter } from "../RatingFilter"
import { Separator } from "../ui/separator"
import { Label } from "../ui/label"
import { Genre } from "@prisma/client"

export default function FilterMenu({ genres, oldSelectedGenres, oldRating }: { genres: string[], oldSelectedGenres: string, oldRating: number }) {

    function formatGenre(string: string | undefined) {
        if (!string) return "";
        return string[0] + string.slice(1).toLowerCase();
    }

    const [selectedGenres, setSelectedGenres] = useState<string[]>(oldSelectedGenres ? oldSelectedGenres.split(",") : []);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    function handleGenresChange() {
        const params = new URLSearchParams(searchParams);
        if (selectedGenres.length > 0) {
            params.set("genres_filter", selectedGenres.join(","));
            params.delete("page");
        } else {
            params.delete("genres_filter");
            params.delete("page");
        }
        replace(`${pathname}?${params.toString()}`);
    }
    useEffect(() => {
        handleGenresChange();
    }, [selectedGenres]);

    return (
        <div className="flex flex-col gap-7">
            <Command className="h-56 gap-1">
                <Label className="text-slate-700">Filter by Genre:</Label>
                <CommandInput placeholder="Search genre..." />
                <CommandList className="custom-scrollbar">
                    <CommandEmpty>No genre found.</CommandEmpty>
                    <CommandGroup>
                        {genres.map((genre: string) => (
                            <CommandItem
                                key={genre}
                                value={genre}
                                onSelect={(currentValue) => {
                                    if (!selectedGenres.includes(currentValue)) {
                                        setSelectedGenres([...selectedGenres, currentValue])
                                    } else {
                                        setSelectedGenres(selectedGenres.filter((selectedGenre) => selectedGenre !== currentValue));
                                    }
                                }
                                }>
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        selectedGenres.includes(genre) ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {formatGenre(genre)}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </Command>
            <Separator />
            <RatingFilter oldValue={oldRating}/>
        </div>
    )
}