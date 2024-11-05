"use client";
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
import { revalidateAll } from "@/lib/actions";
import { ReviewForm } from "./ReviewForm";

const formSchema = z.object({
    rating: z.number().min(1, "This field is required"),
    description: z.string(),
})

export function AddReveiew({ userId, bookId }: { userId: string, bookId: string }) {
    const [open, setOpen] = useState(false)
    const { toast } = useToast()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            rating: 0,
            description: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const response = await fetch("/api/reviews", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...values, userId, bookId }),
        })
        if (response.ok) {
            toast({
                description: "Published review",
            })
            form.reset();
            setOpen(false);
            revalidateAll();
        } else {
            toast({
                variant: "destructive",
                description: "An error occurred"
            })
        }
    }

    function onDialogChange(state: boolean) {
        setOpen(state);
        form.reset();
    }

    return (
        <Dialog open={open} onOpenChange={onDialogChange}>
            <DialogTrigger asChild>
                <Button variant="outline">Add Review</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Review</DialogTitle>
                </DialogHeader>
                <ReviewForm form={form} onSubmit={onSubmit} >
                    <DialogFooter>
                        <Button type="submit">Publish</Button>
                    </DialogFooter>
                </ReviewForm>
            </DialogContent>
        </Dialog>
    )
}
