"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { revalidateGroups } from "@/lib/actions";
import { Button } from "./ui/button";

export default function LeavGroup({ groupId, userId }: { groupId: string, userId: string }) {
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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="h-7">Leave Group</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You will no longer be able to access this group.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={leaveGroup}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}