"use client";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
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
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from "./ui/form";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { DialogFooter } from "./ui/dialog";

const formSchema = z.object({
    description: z.string().min(1, "This field is required"),
})

export function AddComment({ userId, discussionId }: { userId: string, discussionId: string }) {
    const [open, setOpen] = useState(false)
    const { toast } = useToast()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const response = await fetch("/api/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ description: values.description, userId, discussionId }),
        })
        if (response.ok) {
            toast({
                description: "Comment added successfully"
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
                <Button className="h-7">Add Comment</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Comment</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
                        <div className="space-y-3">
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea placeholder="Write a comment..." className="resize-none h-40" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter>
                            <Button type="submit">Publish Comment</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
