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
import { useEffect } from 'react';

const formSchema = z.object({
    title: z.string(),
    author: z.string(),
    description: z.string(),
    imageUrl: z.string(),
  })

export default function EditBook({ params }: { params: { id: string } }) {
    const { toast } = useToast()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            author: "",
            description: "",
            imageUrl: "",
        },
    })
    useEffect(() => {
        const fetchBook = async () => {
            const response = await fetch(`/api/books/${params.id}`);
            if (response.ok) {
                const bookData = await response.json();
                form.reset(bookData);
            } else {
                toast({
                    variant: "destructive",
                    description: "Error loading book data",
                });
            }
        };
        fetchBook();
    }, [params.id, form, toast]);
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const body = Object.fromEntries(
          Object.entries(values).filter(([_, value]) => value !== "")
        )
        const response = await fetch("/api/books/" + params.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
        if (response.ok) {
            toast({
                description: "Book updated successfully"
              })
            form.reset()
            location.reload();
        } else {
            toast({
                variant: "destructive",
                description: "An error occurred"
              })
        }
    }
  return (
    <div className="sm:px-20 sm:py-10 font-[family-name:var(--font-geist-sans)]">
        <Link href="/my_books">
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
                    </div>
                    <Button type="submit" >Submit</Button>
                </form>
            </Form>
        </div>
    </div>
  );
}
