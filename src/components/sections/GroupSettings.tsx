import Link from "next/link";
import AddFriends from "../AddFriends";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { Prisma, User } from "@prisma/client";
import RemoveFromGroup from "../RemoveFromGroup";

type Group = Prisma.GroupGetPayload<{
    include: {
        users: true
    }
}>


export default async function GroupSettings({group, userId}: {group: Group, userId: string}) {
    const usersInGroup = group?.users.filter(user => user.id !== userId) ?? [];
    
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <Label>Users in group:</Label>
                <ScrollArea className="h-[200px]">
                    <div>
                    {usersInGroup.length === 0 && <p className="text-center text-sm mt-16">No users in group</p>}
                    {usersInGroup.map((user: User) => (
                            <div key={user.id}>
                                <div className="flex justify-between items-center p-2 w-full">
                                    <Link href={`/profile/tito`} className="text-nowrap">
                                        <div className="flex gap-1 items-center cursor-pointer">
                                            <Label className="text-[15px] cursor-pointer">{user.username}</Label>
                                            <Avatar className="h-6 w-6">
                                                <AvatarImage src={user.picture ?? ""} alt="@shadcn" />
                                                <AvatarFallback>{user.name[0]}</AvatarFallback>
                                            </Avatar>
                                        </div>
                                    </Link>
                                    {userId === group.createdBy && <RemoveFromGroup groupId={group.id} userId={user.id} />}
                                </div>
                                <Separator />
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </div>
            {userId === group.createdBy &&
                <>
                    <Separator />
                    <div className="flex flex-col gap-2">
                        <Label>Add users to group</Label>
                        <AddFriends following={[]} userId={userId} addToGroupId={group?.id} usersInGroup={group.users}/>
                    </div>
                </>
            }
        </div>
    )
}