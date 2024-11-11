"use client"
import { useEffect, useState } from "react"
import {
    Command,
    CommandEmpty,
    CommandInput,
    CommandList,
} from "@/components/ui/command"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { revalidateFollows } from "@/lib/actions"
import { Follows, User } from "@prisma/client"

async function getFriends(username: string, setUsers: (users: any) => void, following: Follows[], userId: string) {
    if (username === "") {
        setUsers([]);
        return;
    }
    try {
        const res = await fetch(`/api/users?username=${username}`);
        let users = await res.json();
        users = users.filter((user: User) => !following.some((follow: Follows) => follow.followingId === user.id) && user.id !== userId);
        setUsers(users);
    } catch (error) {
        console.error(error);
        setUsers([]);
    }
}

export default function AddFriends({following, userId}: {following: Follows[], userId: string}) {
    const [users, setUsers] = useState<User[]>([]);
    const [searchedUsers, setSearchedUsers] = useState<string>("");
    const router = useRouter();
    useEffect(() => {
        getFriends(searchedUsers, setUsers, following, userId);
        console.log(users);
    }, [searchedUsers])
    async function handleFollow(id: string) {
        try {
            const res = await fetch(`/api/follow`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    followerId: userId,
                    followingId: id,
                }),
            });
            if (res.ok) {
                revalidateFollows();
                setUsers(users.filter((user:User) => user.id !== id));
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <Command className="h-56 gap-1">
            <CommandInput placeholder="Search by username" onChangeCapture={(e) => setSearchedUsers(e.currentTarget.value)} />
            <CommandList className="custom-scrollbar">
                {(users.length === 0 && searchedUsers !== "") && <CommandEmpty>No Users found.</CommandEmpty>}
                <div>
                    {users.map((user: User) => (
                        <div
                            key={user.id}
                            className="flex flex-col gap-2 p-2 hover:bg-slate-100 rounded-md"
                        >
                            <div className="flex items-center justify-between w-full">
                                <div 
                                    className="flex items-center gap-3 cursor-pointer"
                                    onClick={() => router.push(`/profile/${user.username}`)}
                                >
                                    <Avatar className="bg-slate-200 items-center justify-center hover:bg-slate-100">
                                        <AvatarImage src={user.picture ?? ""} />
                                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <p>{user.username}</p>
                                </div>
                                <Button className="h-7" onClick={() => handleFollow(user.id)}>Follow</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </CommandList>
        </Command>
    )
}