import Link from "next/link";
import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { EditGroup } from "../EditGroup";
import DeleteGroup from "../DeleteGroup";
import LeavGroup from "../LeavGroup";
import { CreateDiscussion } from "../CreateDiscussion";
import { Prisma } from "@prisma/client";

type Group = Prisma.GroupGetPayload<{
    include: {
        users: true,
        discussions: {
            include: {
                user: {
                    select: {
                        username: true,
                        picture: true
                    }
                }
            }
        }
    }
}>

export default async function Discussions({ group, userId }: { group: Group, userId: string }) {
    console.log(group.discussions)
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
                <Label className="text-2xl">Discussions</Label>
                <CreateDiscussion groupId={group.id} userId={userId} />
            </div>
            {group.discussions.length === 0 && <p className="text-center text-sm mt-16">No discussions in group</p>}
            <ScrollArea className="h-[60vh]">
                <div className="px-5">
                    {group.discussions.map((discussion) => (
                        <div key={discussion.id}>
                            <Link href={{query: {discussion: discussion.id}}} className="text-nowrap">
                            <div className="flex justify-between items-center p-2 cursor-pointer">
                                <div className="flex gap-2 items-center">
                                    <h4 className="font-semibold">{discussion.title}</h4>
                                    <Label className="cursor-pointer">by {discussion.user.username}</Label>
                                </div>
                                <p className="text-xs text-gray-500">{new Date(discussion.updatedAt).toLocaleDateString("en-GB", {day: "2-digit", month: "2-digit", year: "numeric"})}</p>
                            </div>
                            </Link>
                            <Separator />
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
}