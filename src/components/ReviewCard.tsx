import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import EditReview from "./EditReview";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Prisma } from "@prisma/client";
import { Separator } from "./ui/separator";
import Link from "next/link";

type Review = Prisma.ReviewGetPayload<{
    include: {
        user: true
        Book?: true
    }
}>

export default function ReviewCard({ review, owned }: { review: Review, owned?: boolean }) {
    return (
        <div className="flex flex-row gap-2 w-full border shadow rounded-xl">
            {review.Book && (
                <>
                    <Link href={`/book/${review.Book.id}`} className="flex gap-2 items-center w-40 flex-col text-center py-4">
                        <img src={review.Book.imageUrl} alt={review.Book.title} className="w-24 h-32" />
                        <p className="px-2">{review.Book.title}</p>
                    </Link>
                    <Separator orientation="vertical" />
                </>
            )}
            <Card key={review.id} className="w-full border-none shadow-none">
                <CardHeader className="pb-3 gap-1">
                    <div className="flex justify-between">
                        <CardTitle>{review.user.username}</CardTitle>
                        <div className="flex gap-2 items-center">
                            <p className="text-sm text-gray-400">{new Date(review.createdAt).toLocaleDateString("en-GB")}</p>
                            {owned && (<EditReview review={review} />)}
                        </div>
                    </div>
                    <CardDescription className="flex gap-1">
                        {Array.from({ length: review.rating }).map((_, i) => (
                            <StarFilledIcon key={i} />
                        ))}
                        {Array.from({ length: 5 - review.rating }).map((_, i) => (
                            <StarIcon key={i} />
                        ))}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>{review.description}</p>
                </CardContent>
            </Card>
        </div>
    )
}