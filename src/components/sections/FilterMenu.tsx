"use client"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { FaFilter } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import { Check, ChevronsUpDown } from "lucide-react"
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

const MAX_PAGINATION = 5;

export default function FilterMenu({
    pageNumber,
    maxPerPage,
}: {
    pageNumber: string | string[];
    maxPerPage: number;
}) {
    const [genres, setGenres] = useState<string[]>([]);
    const { toast } = useToast()

    useEffect(() => {
        const fetchGenres = async () => {
            const response = await fetch(`/api/genres`);
            if (response.ok) {
                const genresData = await response.json();
                setGenres(genresData);
            } else {
                toast({
                    variant: "destructive",
                    description: "Error loading genres data",
                });
            }
        };
        fetchGenres();
    }, [toast]);

    function formatGenre(string: string | undefined) {
        if (!string) return "";
        return string[0] + string.slice(1).toLowerCase();
    }

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    function handleGenresChange() {
        const params = new URLSearchParams(searchParams);
        if (selectedGenres.length > 0) {
            params.set("genres_filter", selectedGenres.join(","));
        } else {
            params.delete("genres_filter");
        }
        replace(`${pathname}?${params.toString()}`);
    }
    useEffect(() => {
        handleGenresChange();
    }, [selectedGenres]);

    return (
        <div className="flex gap-10">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button>
                        <FaFilter /> Filter
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">

                    <h2>Filter by genre</h2>

                    <Command>
                        <CommandInput placeholder="Search genre..." />
                        <CommandList>
                            <CommandEmpty>No genre found.</CommandEmpty>
                            <CommandGroup>
                                {genres.map((genre: string) => (
                                    <CommandItem
                                        key={genre}
                                        value={genre}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue === value ? "" : currentValue)
                                            setSelectedGenres([...selectedGenres, currentValue])
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === genre ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {formatGenre(genre)}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>


                    <div className="flex flex-wrap gap-2">
                        {selectedGenres.map((genre, index) => (
                            <button key={index} onClick={() => {
                                if (genre === value) {
                                    setValue("");
                                }
                                setSelectedGenres(selectedGenres.filter((selectedGenre) => selectedGenre !== genre));
                            }}>
                                <span key={genre}>
                                    <div className="flex items-center px-2 py-1 bg-gray-100 rounded-full gap-2">
                                        {formatGenre(genre)}
                                        <FaCircleXmark />
                                    </div>
                                </span>
                            </button>
                        ))}
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}