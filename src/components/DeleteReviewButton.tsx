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
import { Button } from "./ui/button"
import { revalidateBook } from "@/lib/actions";

export default function DeleteReviewButton({ reviewId, onClick }: { reviewId: string, onClick: () => void }) {
  async function deleteBook() {
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/reviews/${reviewId}`, {
      method: "DELETE",
    });
    onClick();
    revalidateBook(reviewId);
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-red-500">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. It will permanently delete your
            review and will delete your data from our servers.
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