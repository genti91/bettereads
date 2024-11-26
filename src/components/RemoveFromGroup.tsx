"use client";
import { revalidateGroups } from "@/lib/actions";
import { Button } from "./ui/button";

export default function RemoveFromGroup({ groupId, userId }: { groupId: string, userId: string }) {
  async function leaveGroup() {
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/groups/${groupId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userToRemove: userId,
        }),
    });
    revalidateGroups();
  }
  return (
    <Button className="h-6" onClick={leaveGroup}>Remove</Button>
  )
}