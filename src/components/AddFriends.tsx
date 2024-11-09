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

async function getFriends(username: string, setUsers: (users: any) => void) {
    if (username === "") {
        setUsers([]);
        return;
    }
    try {
        const res = await fetch(`/api/users?username=${username}`);
        const data = await res.json();
        setUsers(data);
    } catch (error) {
        console.error(error);
        setUsers([]);
    }
}

export default function AddFriends() {
    const [users, setUsers] = useState<string[]>([]);
    const [searchedUsers, setSearchedUsers] = useState<string>("");
    const router = useRouter();
    useEffect(() => {
        getFriends(searchedUsers, setUsers);
    }, [searchedUsers])

    return (
        <Command className="h-56 gap-1">
            <CommandInput placeholder="Search by username" onChangeCapture={(e) => setSearchedUsers(e.currentTarget.value)} />
            <CommandList className="custom-scrollbar">
                {(users.length === 0 && searchedUsers !== "") && <CommandEmpty>No Users found.</CommandEmpty>}
                <div>
                    {users.map((user: any) => (
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
                                        <AvatarImage src={user.picture} />
                                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <p>{user.username}</p>
                                </div>
                                <Button className="h-7">Follow</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </CommandList>
        </Command>
    )
}