"use client";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";

export default function EditReview({review}:any) {
    return (
        <>
            <TrashIcon className="cursor-pointer"/>
            <Pencil1Icon className="cursor-pointer" onClick={() => alert("hoal")}/>
        </>
    )
}