import { ActivityType } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import Link from "next/link";
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";

async function getActivity(userId: string) {
    const response = await fetch(`${process.env.APP_URL}/api/activity/${userId}`);
    if (response.ok) {
        return await response.json();
    } else {
        return [];
    }
}

function timeAgo(date: Date): string {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    
    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) {
        return `${years}y ago`;
    } else if (months > 0) {
        return `${months}mo ago`;
    } else if (days > 0) {
        return `${days}d ago`;
    } else if (hours > 0) {
        return `${hours}h ago`;
    } else if (minutes > 0) {
        return `${minutes}m ago`;
    } else {
        return `${seconds}s ago`;
    }
}

export default async function Feed({ userId }: { userId: string }) {
    const activity = await getActivity(userId);
    return (
        <div>
            <h1>Feed</h1>
            <ScrollArea className="h-[648px] w-80">
                <div className="flex flex-col gap-4 pr-4">
                    {activity.map((item: any) => (
                        <Card key={item.id}>
                            <CardHeader className="p-4 pb-3">
                                <div className="flex justify-between items-center">
                                    <Link href={`/profile/${item.user.username}`}>
                                        <div className="flex gap-2 items-center">
                                            <Avatar className="h-9 w-9 bg-slate-200 items-center justify-center hover:bg-slate-100">
                                                <AvatarImage src={item.user.picture}/>
                                                <AvatarFallback>{item.user.name[0]}</AvatarFallback>
                                            </Avatar>
                                            <p className="font-semibold underline">{item.user.username}</p>
                                        </div>
                                    </Link>
                                    <p className="text-gray-500 text-xs">{timeAgo(new Date(item.createdAt))}</p>
                                </div>
                            </CardHeader>
                            <CardDescription className="px-4 pb-2">
                                {item.type === ActivityType.ADD_REVIEW &&
                                    <div className="flex gap-1">
                                        <p>Left a review on:</p>
                                        <Link href={`/book/${item.book.id}`}>
                                            <p className="underline">{item.book.title}</p>
                                        </Link>
                                    </div>
                                }
                            </CardDescription>
                            <CardContent className="px-4 pb-4">
                                {item.type === ActivityType.ADD_REVIEW &&
                                    <div className="flex gap-3 items-center">
                                        <p className=" text-slate-700 mt-[2px]">Rated:</p>
                                        <div className="flex gap-1">
                                            {Array.from({ length: Math.floor(item.review.rating) }).map((_, i) => (
                                                <StarFilledIcon key={i} />
                                            ))}
                                            {Array.from({ length: 5 - Math.floor(item.review.rating) }).map((_, i) => (
                                                <StarIcon key={i} />
                                            ))}
                                        </div>
                                    </div>
                                }
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}