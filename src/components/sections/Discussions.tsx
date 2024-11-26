import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardHeader } from "../ui/card";
import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { Group } from "@prisma/client";
import { EditGroup } from "../EditGroup";
import DeleteGroup from "../DeleteGroup";
import LeavGroup from "../LeavGroup";

export default async function Discussions({ group, userId }: { group: Group, userId: string }) {
    return (
        <div className="flex flex-col gap-3 min-w-[60vh] w-[50%]">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">{group.name}</h1>
                {group.createdBy === userId ? 
                    <div className="flex gap-2">
                        <EditGroup group={group} />
                        <DeleteGroup groupId={group.id} />
                    </div>
                    :
                    <LeavGroup groupId={group.id} userId={userId} />
                }
            </div>
            <p className="text-lg w-full">{group.description}</p>
            <Separator />
            <div className="flex gap-7 items-center justify-between py-2 min-w-full">
                <Label className="text-2xl">Discussions:</Label>
                <Button className="h-7">Create Discussion</Button>
            </div>
            <ScrollArea className="h-[60vh]">
                <div className="px-5">
                    {Array.from({length: 20}).map((_, i) => (
                        <>
                            <Link href={{query: {discussion: 'afsdafasd'}}} className="text-nowrap">
                            <div className="flex justify-between items-center p-2">
                                <div className="flex gap-2 items-center">
                                    <h4 className="font-semibold">Discussion 1</h4>
                                    <Label>by User1</Label>
                                </div>
                                <p className="text-xs text-gray-500">26/11/2024</p>
                            </div>
                            </Link>
                            <Separator />
                        </>
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
}