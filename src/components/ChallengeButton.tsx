"use client"
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { revalidateAll } from "@/lib/actions";

export default function ChallengeButton({ userId }: { userId: string }) {
    const [goal, setGoal] = useState(0);
    async function createChallenge() {
        await fetch(`/api/challenge/${userId}`, {
            method: "POST",
            body: JSON.stringify({ amount: goal }),
        });
        revalidateAll();
    }
    return (
        <div className="flex flex-col gap-1 items-center">
            <p className="text-sm">I want to read</p>
            <Input type="number" className="w-20" placeholder="0" onChange={(e) => setGoal(parseInt(e.target.value))} />
            <p className="text-sm">books in 2024</p>
            <Button className="h-7" disabled={!goal} onClick={createChallenge}>Set Goal</Button>
        </div>
    )
}