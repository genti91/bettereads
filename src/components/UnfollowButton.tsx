"use client"
import { Button } from "@/components/ui/button";
import { revalidateFollows } from "@/lib/actions";
import { useState } from "react";

export default function UnfollowButton({userId, followingId}: {userId: string, followingId: string}) {
    const [buttonText, setButtonText] = useState("Following");
    async function handleUnfollow() {
        try {
            const res = await fetch(`/api/follow`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    followerId: userId,
                    followingId: followingId,
                }),
            });
            if (res.ok) {
                revalidateFollows();
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <Button
            className="h-7 w-24"
            onClick={handleUnfollow}
            onMouseEnter={() => setButtonText("Unfollow")}
            onMouseLeave={() => setButtonText("Following")}
        >
            {buttonText}
        </Button>                  
  );
}