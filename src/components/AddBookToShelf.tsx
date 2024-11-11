"use client"
import { CheckIcon, PlusCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "./ui/separator"
import { Shelf } from "@prisma/client";
import { useState } from "react";
import { revalidateShelves } from "@/lib/actions";

function addOrRemoveBook(bookId: string, shelfId: string, action: "add" | "remove", userId: string) {
    fetch("/api/addToShelf", {
        method: action === "add" ? "POST" : "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookId, shelfId, userId }),
    });
}

export function AddBookToShelf({ defaultShelves,  customShelves, bookId, shelvesWithBook, userId }: { defaultShelves: Shelf[], customShelves: Shelf[], bookId: string, shelvesWithBook: Shelf[], userId: string }) {
    const [selectedShelf, setSelectedShelf] = useState<Shelf | undefined>(shelvesWithBook.find((shelf) => shelf.type === "DEFAULT") || undefined);
    const [selectedCustomShelf, setSelectedCustomShelf] = useState<Shelf[]>(shelvesWithBook.filter((shelf) => shelf.type === "CUSTOM"));
    function handleShelfClick(isSelected: boolean, shelf: Shelf) {
        if (isSelected) {
            addOrRemoveBook(bookId, shelf.id, "remove", userId);
            setSelectedShelf(undefined);
        } else {
            if (selectedShelf) {
                addOrRemoveBook(bookId, selectedShelf.id, "remove", userId);
            }
            addOrRemoveBook(bookId, shelf.id, "add", userId);
            setSelectedShelf(shelf);
        }
    }
    function handleCustomShelfClick(isSelected: boolean, shelf: Shelf) {
        if (isSelected) {
            addOrRemoveBook(bookId, shelf.id, "remove", userId);
            setSelectedCustomShelf(selectedCustomShelf.filter((sh) => sh.id !== shelf.id));
        } else {
            addOrRemoveBook(bookId, shelf.id, "add", userId);
            setSelectedCustomShelf([...selectedCustomShelf, shelf]);
        }
    }
    function removeBook(bookId: string, shelfId: string) {
        addOrRemoveBook(bookId, shelfId, "remove", userId);
        if (selectedShelf?.id === shelfId) {
            setSelectedShelf(undefined);
        } else {
            setSelectedCustomShelf(selectedCustomShelf.filter((sh) => sh.id !== shelfId));
        }
        revalidateShelves();
    }
  return (
    <Dialog onOpenChange={(open) => !open && revalidateShelves()}>
        <div className="flex gap-4 items-center">
            {[...selectedCustomShelf, ...(selectedShelf ? [selectedShelf] : [])].map((shelf: Shelf) => (
                <div className="bg-gray-200 p-1 px-3 rounded-2xl flex gap-2 items-center">
                    <p>{shelf.name}</p>
                    <CrossCircledIcon className="w-4 h-4 cursor-pointer" onClick={() => removeBook(bookId, shelf.id)}/>
                </div>
            ))}
            {(selectedCustomShelf.length === 0 && selectedShelf === undefined) && <p>Add book to shelf</p>}
            <Separator orientation="vertical" />
            <DialogTrigger asChild>
                <PlusCircledIcon className="w-6 h-6 cursor-pointer"/>
            </DialogTrigger>
        </div>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col gap-3">
        <h2 className="text-lg font-bold">Add to Shelf</h2>
            <div className="flex items-center gap-2 flex-wrap">
                {defaultShelves.map((shelf: Shelf) => {
                    let isSelected = selectedShelf?.id === shelf.id;
                    return (
                        <button 
                            className={"flex items-center justify-center hover:bg-gray-200 rounded-3xl" + (isSelected ? " bg-gray-200" : " bg-gray-100")}
                            key={shelf.id}
                            onClick={() => handleShelfClick(isSelected, shelf)}
                        >
                            <div className="flex items-center gap-1 justify-center p-2 px-4 wrap">
                                <p className="text-sm font-semibold text-nowrap">{shelf.name}</p>
                                { !isSelected ? 
                                    <div className="h-6"></div>
                                    :
                                    <CheckIcon className="w-6 h-6"/>
                                }
                            </div>
                        </button>
                    )
                })}
            </div>
        </div>
        <div className="flex flex-col gap-3">
        <h2 className="text-lg font-bold">Add to Custom Shelf</h2>
            <div className="flex items-center gap-2 flex-wrap">
            {customShelves.map((shelf: Shelf) => {
                    let isSelected = selectedCustomShelf.includes(shelf);
                    return (
                        <button 
                            className={"flex items-center justify-center hover:bg-gray-200 rounded-3xl" + (isSelected ? " bg-gray-200" : " bg-gray-100")}
                            key={shelf.id}
                            onClick={() => handleCustomShelfClick(isSelected, shelf)}
                        >
                            <div className="flex items-center gap-1 justify-center p-2 px-4 wrap">
                                <p className="text-sm font-semibold text-nowrap">{shelf.name}</p>
                                { !isSelected ? 
                                    <div className="h-6"></div>
                                    :
                                    <CheckIcon className="w-6 h-6"/>
                                }
                            </div>
                        </button>
                    )
                })}
            </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
