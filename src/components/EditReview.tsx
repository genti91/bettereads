"use client";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "./ui/textarea"
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useState } from "react";
import { revalidateBook } from "@/lib/actions";
import DeleteReviewButton from "./DeleteReviewButton";
import { Review } from "@prisma/client";

const formSchema = z.object({
    rating: z.number().min(1, "La clasificación es requerida").max(5, "La clasificación no puede ser mayor a 5"),
    description: z.string(),
})

export default function EditReview({review}: {review: Review}) {
    const [open, setOpen] = useState(false)
    const { toast } = useToast()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            rating: review.rating,
            description: review.description
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const response = await fetch(`/api/reviews/${review.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
        if (response.ok) {
            toast({
                description: "Reseña actualizada"
            })
            setOpen(false);
            revalidateBook(review.bookId);
        } else {
            toast({
                variant: "destructive",
                description: "An error occurred"
            })
       }
    }
    function valuesChanged() {
        return form.getValues().rating !== review.rating || form.getValues().description !== review.description
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Pencil1Icon className="cursor-pointer"/>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>Añadir reseña</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
                        <div className="space-y-3">
                            <FormField
                                control={form.control}
                                name="rating"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Clasificación</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="5" {...field} onChange={(e) => field.onChange(parseInt(e.target.value, 10))}/>
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
                                        <FormLabel>Reseña</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Escribir reseña" className="resize-none h-40" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter>
                            <DeleteReviewButton reviewId={review.id} onClick={() => setOpen(false)}/>
                            <Button disabled={!valuesChanged()} type="submit">Guardar reseña</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}