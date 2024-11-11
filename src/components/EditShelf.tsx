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
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { revalidateShelves } from "@/lib/actions";
import { Shelf } from "@prisma/client";
import { Input } from "./ui/input";
import DeleteShelfButton from "./DeleteShelfButton";


export default function EditShelf({shelf}: {shelf: Shelf}) {
    const [shelfName, setShelfName] = useState(shelf.name)
    const [open, setOpen] = useState(false)
    const { toast } = useToast()


    async function onSubmit() {
        const response = await fetch(`/api/bookshelves`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name: shelfName, id: shelf.id}),
        })
        if (response.ok) {
            toast({
                description: "Shelf updated"
            })
            setOpen(false);
            revalidateShelves();
        } else {
            toast({
                variant: "destructive",
                description: "An error occurred"
            })
       }
    }
    function valuesChanged() {
        return shelfName !== shelf.name && shelfName !== ""
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Pencil1Icon className="cursor-pointer"/>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>Edit Shelf</DialogTitle>
                </DialogHeader>
                <Input value={shelfName} onChange={(e) => setShelfName(e.target.value)}/>
                <DialogFooter>
                    <DeleteShelfButton shelfId={shelf.id} onClick={() => setOpen(false)}/>
                    <Button disabled={!valuesChanged()} onClick={onSubmit}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}