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
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { revalidateBook } from "@/lib/actions";
import DeleteReviewButton from "./DeleteReviewButton";
import { Review } from "@prisma/client";
import { ReviewForm } from "./ReviewForm";

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
                <ReviewForm form={form} onSubmit={onSubmit} oldRating={review.rating}>
                    <DialogFooter>
                        <DeleteReviewButton reviewId={review.id} onClick={() => setOpen(false)}/>
                        <Button disabled={!valuesChanged()} type="submit">Guardar reseña</Button>
                    </DialogFooter>
                </ReviewForm>
            </DialogContent>
        </Dialog>
    )
}