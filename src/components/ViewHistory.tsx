"use client";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "./ui/label";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { BookAction, BookHistory } from "@prisma/client";

export default function ViewHistory({history}: {history: BookHistory[]}) {
  return (
    <Dialog >
        <DialogTrigger asChild>
            <button><Label className="text-base underline cursor-pointer">View History</Label></button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[525px] pt-11">
            <ScrollArea className="h-[300px]">
                <div className="flex flex-col gap-3 px-3">
                    {history.map((history) => (
                        <>
                            <div key={history.id} className="flex justify-between">
                                <div className="flex gap-3">
                                    <p className="text-sm w-12">{history.action === BookAction.CREATE ? "Added" : (history.action === BookAction.UPDATE ? "Updated" : "Deleted")}</p>
                                    <Separator orientation="vertical"/>
                                    <p className="text-sm">{history.title} - {history.author}</p>
                                </div>
                                <p className="text-sm">{new Date(history.createdAt).toISOString().split('T')[0].split('-').reverse().join('-')}</p>
                            </div>
                            <Separator key={history.id} />
                        </>
                    ))}
                </div>
            </ScrollArea>
        </DialogContent>
    </Dialog>
  )
}