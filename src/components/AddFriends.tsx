"use client"
import { useState } from "react"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"

export default function AddFriends() {
    const users = ["John Doe", "John Doe 1", "John Doe 2"]
    const [selectedUser, setSelectedUser] = useState<string[]>([]);

    return (
        <Command className="h-56 gap-1">
            <CommandInput placeholder="Search" />
            <CommandList className="custom-scrollbar">
                <CommandEmpty>No Users found.</CommandEmpty>
                <CommandGroup>
                    {users.map((user: string) => (
                        <CommandItem
                            key={user}
                            value={user}
                            onSelect={(currentValue) => {
                                if (!selectedUser.includes(currentValue)) {
                                    setSelectedUser([...selectedUser, currentValue])
                                } else {
                                    setSelectedUser(selectedUser.filter((selectedUser) => selectedUser !== currentValue));
                                }
                            }
                            }>
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-3">
                                    <Avatar className="bg-slate-200 items-center justify-center hover:bg-slate-100">
                                        <AvatarImage src={"https://github.com/shadcn.png"}/>
                                        <AvatarFallback>P</AvatarFallback>
                                    </Avatar>
                                    <p>{user}</p>
                                </div>
                                <Button className="h-7">Follow</Button>
                            </div>
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Command>
    )
}