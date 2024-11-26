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
import { revalidateAll } from "@/lib/actions";
import { TrashIcon } from "@radix-ui/react-icons";

export default function DeleteComment({ commentId }: { commentId: string }) {
  async function deleteBook() {
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/comments/${commentId}`, {
      method: "DELETE",
    });
    revalidateAll();
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button><TrashIcon className="w-5 h-5 cursor-pointer" /></button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. It will permanently delete your comment.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteBook}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}