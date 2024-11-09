"use client"
import { Button } from "@/components/ui/button";
import { revalidateFollows } from "@/lib/actions";

export default function FollowBackButton({userId, followerId}: {userId: string, followerId: string}) {
    async function handleFollow() {
        try {
            const res = await fetch(`/api/follow`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    followerId: userId,
                    followingId: followerId,
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
        <Button className="h-7" onClick={handleFollow}>Follow Back</Button>                  
  );
}