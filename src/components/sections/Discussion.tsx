import { Group, Prisma } from "@prisma/client";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { AddComment } from "../AddComment";
import DeleteComment from "../DeleteComment";
import DeleteDiscussion from "../DeleteDiscussion";
import { EdditDiscussion } from "../EdditDiscussion";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"

type DiscussionType = Prisma.DiscussionGetPayload<{
    include: {
        user: {
            select: {
                id: true,
                username: true,
                picture: true
            }
        }
        comments: {
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

export default async function Discussion({ discussion, group, userId }: { discussion: DiscussionType, group: Group, userId: string }) {
    return (
        <div className="flex flex-col gap-3 min-w-[95vh] w-[70%]">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-bold">{discussion.title}</h1>
                    <p className="text-xl">by {discussion.user.username}</p>
                </div>
                <div className="flex gap-2 items-center">
                    <Label>From group {group.name}</Label>
                    {userId === discussion.userId && 
                        <>
                            <EdditDiscussion userId={userId} groupId={group.id} discussion={discussion} />
                            <DeleteDiscussion discussionId={discussion.id} />
                        </>
                    }
                </div>
            </div>
            <p className="font-semibold">{discussion.description}</p>
            <Separator />
            <div className="flex gap-7 items-center justify-between py-2 min-w-full">
                <Label className="text-2xl">Comments:</Label>
                <AddComment discussionId={discussion.id} userId={userId} />
            </div>
            {discussion.comments.length === 0 && <p className="text-center text-sm mt-16">No comments</p>}
            <ScrollArea className="h-[60vh]">
                <div className="px-5">
                    {discussion.comments.map((comment) => (
                        <div key={comment.id}>
                            <div className="flex flex-col gap-2 py-4">
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-2 items-center">
                                        <Label className="cursor-pointer">{comment.user.username}</Label>
                                        <Avatar className="h-6 w-6">
                                            <AvatarImage src={comment.user.picture ?? ""} alt="@shadcn" />
                                            <AvatarFallback>{comment.user.username[0].toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <p className="text-xs text-gray-500">{new Date(comment.updatedAt).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })}</p>
                                        {userId === comment.userId && <DeleteComment commentId={comment.id} />}
                                    </div>
                                </div>
                                <h4 className="w-[80%]">{comment.description}</h4>
                            </div>
                            <Separator />
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
}