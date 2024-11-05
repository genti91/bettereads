"use client"
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { revalidateAll } from "@/lib/actions";
import { ShelfType } from "@prisma/client";

export default function AddShelf({ userId }: { userId: string }) {
    const [addShelf, setAddShelf] = useState(false);
    const [shelf, setShelf] = useState("");
    const { toast } = useToast();
    async function handleClick() {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_APP_URL}/api/bookshelves`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name: shelf, userId, type: ShelfType.CUSTOM }),
                }
            );
            if (!response.ok) {
                throw new Error("Failed to add shelf");
            } else {
                revalidateAll();
                toast({
                    description: "Shelf added successfully!",
                });
            }
        } catch (error) {
            console.error(error);
            toast({
                variant: "destructive",
                description: "Failed to add shelf",
            });
        }
        setAddShelf(false);
        setShelf("");
    }
  return (
    <>
        {!addShelf ? 
            <Button className="h-7" onClick={() => setAddShelf(true)} >Add Shelf</Button>
        :
            <div className="flex gap-1">
                <Input placeholder="Shelf" className="h-7 w-20" value={shelf} onChange={(e) => setShelf(e.target.value)} />
                <Button className="h-7" onClick={handleClick} >Add</Button>
            </div>
        }
    </>
  );
}
