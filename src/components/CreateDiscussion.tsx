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
import { GroupForm } from "./GroupForm";

const formSchema = z.object({
    name: z.string().min(1, "This field is required"),
    description: z.string().min(1, "This field is required"),
})

export function CreateDiscussion({ userId, groupId }: { userId: string, groupId: string }) {
    const [open, setOpen] = useState(false)
    const { toast } = useToast()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const response = await fetch("/api/discussions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: values.name, description: values.description, userId, groupId }),
        })
        if (response.ok) {
            toast({
                description: "Discussion created successfully",
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
                <Button className="h-7" disabled>Start Discussion</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Start Discussion</DialogTitle>
                </DialogHeader>
                <GroupForm form={form} onSubmit={onSubmit} buttonText="Start Discussion" discussion />
            </DialogContent>
        </Dialog>
    )
}
