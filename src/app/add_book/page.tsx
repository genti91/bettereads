"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { revalidateAll } from "@/lib/actions"
import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown } from "lucide-react"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useState, useEffect } from "react"
import { prisma } from "@/lib/prisma";

const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    author: z.string().min(1, "Author is required"),
    description: z.string().min(1, "Description is required"),
    imageUrl: z.string().min(1, "Image URL is required"),
    editorial: z.string().min(1, "Editorial name is required"),
    pageAmount: z.number().min(1, "Page amount is required"),
})

export default function Page() {
    const { toast } = useToast()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            author: "",
            description: "",
            imageUrl: "",
            editorial: "",
            pageAmount: 0,
        },
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const response = await fetch("/api/books", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...values, genres: selectedGenres }),
        })
        if (response.ok) {
            toast({
                description: "Book added successfully"
            })
            form.reset();
            revalidateAll();
        } else {
            toast({
                variant: "destructive",
                description: "An error occurred"
            })
        }
    }

    const [genres, setGenres] = useState([]) as any;

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
    }, []);

    function formatGenre(string: string) {
        return string[0] + string.slice(1).toLowerCase();
    }

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

    return (
        <div className="sm:px-20 sm:py-10 font-[family-name:var(--font-geist-sans)]">
            <Link href="/profile">
                <Button>Go Back</Button>
            </Link>
            <div className="flex flex-col items-center">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-1/3 flex flex-col gap-8">
                        <div className="space-y-3">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Title" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="author"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Author</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Author" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Description" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="imageUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Image URL</FormLabel>
                                        <FormControl>
                                            <Input placeholder="URL" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="editorial"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Editorial</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Editorial" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="pageAmount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Page Amount</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="Page Amount" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormItem>
                                <FormLabel>Genres</FormLabel>
                            </FormItem>
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={open}
                                        className="w-[200px] justify-between"
                                    >
                                        {value
                                            ? formatGenre(genres.find((genre: string) => genre === value))
                                            : "Select genre..."}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search genre..." />
                                        <CommandList>
                                            <CommandEmpty>No genre found.</CommandEmpty>
                                            <CommandGroup>
                                                {genres.map((genre: any) => (
                                                    <CommandItem
                                                        key={genre}
                                                        value={genre}
                                                        onSelect={(currentValue) => {
                                                            setValue(currentValue === value ? "" : currentValue)
                                                            setOpen(false)
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
                                </PopoverContent>
                            </Popover>
                            <div className="flex flex-wrap gap-2">
                                {selectedGenres.map((genre) => (
                                    <button onClick={() => {
                                        if (genre === value) {
                                            setValue("");
                                        }
                                        setSelectedGenres(selectedGenres.filter((selectedGenre) => selectedGenre !== genre));
                                    }}>
                                        <span
                                            key={genre}
                                            className="px-2 py-1 bg-gray-100 rounded-full"
                                        >
                                            {formatGenre(genre)}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <Button type="submit" >Submit</Button>
                    </form>
                </Form>
            </div>
        </div >
    );
}
