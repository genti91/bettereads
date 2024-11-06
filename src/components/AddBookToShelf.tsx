"use client"
import { CheckIcon, PlusCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "./ui/separator"
import { Shelve } from "@prisma/client";
import { useState } from "react";
import { revalidateShelves } from "@/lib/actions";

function addOrRemoveBook(bookId: string, shelfId: string, action: "add" | "remove") {
    fetch("/api/addToShelf", {
        method: action === "add" ? "POST" : "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookId, shelfId }),
    });
}

export function AddBookToShelf({ defaultShelves,  customShelves, bookId, shelvesWithBook }: { defaultShelves: Shelve[], customShelves: Shelve[], bookId: string, shelvesWithBook: Shelve[] }) {
    const [selectedShelf, setSelectedShelf] = useState<Shelve | undefined>(shelvesWithBook.find((shelf) => shelf.type === "DEFAULT") || undefined);
    const [selectedCustomShelf, setSelectedCustomShelf] = useState<Shelve[]>(shelvesWithBook.filter((shelf) => shelf.type === "CUSTOM"));
    function handleShelfClick(isSelected: boolean, shelf: Shelve) {
        if (isSelected) {
            addOrRemoveBook(bookId, shelf.id, "remove");
            setSelectedShelf(undefined);
        } else {
            if (selectedShelf) {
                addOrRemoveBook(bookId, selectedShelf.id, "remove");
            }
            addOrRemoveBook(bookId, shelf.id, "add");
            setSelectedShelf(shelf);
        }
    }
    function handleCustomShelfClick(isSelected: boolean, shelf: Shelve) {
        if (isSelected) {
            addOrRemoveBook(bookId, shelf.id, "remove");
            setSelectedCustomShelf(selectedCustomShelf.filter((sh) => sh.id !== shelf.id));
        } else {
            addOrRemoveBook(bookId, shelf.id, "add");
            setSelectedCustomShelf([...selectedCustomShelf, shelf]);
        }
    }
    function removeBook(bookId: string, shelfId: string) {
        addOrRemoveBook(bookId, shelfId, "remove");
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
            {[...selectedCustomShelf, ...(selectedShelf ? [selectedShelf] : [])].map((shelf: Shelve) => (
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
                {defaultShelves.map((shelf: Shelve) => {
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
            {customShelves.map((shelf: Shelve) => {
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
