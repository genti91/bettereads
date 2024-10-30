import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { StarIcon, StarFilledIcon } from "@radix-ui/react-icons"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { AddReveiew } from "./AddReview"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"
import EditReview from "./EditReview"
import { Prisma } from "@prisma/client"

type Review = Prisma.ReviewGetPayload<{
    include: {
        user: true
    }
}>

export default async function Reviews({reviews, bookId}: {reviews: Review[], bookId: string}) {
    const session = await getServerSession(authOptions)
    let averageRating = Number((reviews.reduce((acc:number, review:Review) => acc + review.rating, 0) / reviews.length).toFixed(1))
    const myReview = reviews.find((review:Review) => session?.user.id == review.userId)
    averageRating = Number.isNaN(averageRating) ? 0 : averageRating
    let reviewsFiltered = reviews
    if (myReview) {
        reviewsFiltered = reviews.filter((review:Review) => review.id != myReview.id)
    }
    return (
        <div className="flex flex-col gap-4">
            <h1 className="font-[500] text-2xl">Opiniones del libro</h1>
            <div className="flex gap-8">
                <div className="flex flex-col gap-3">
                    <div className="flex gap-4 items-center">
                        <h1 className="text-4xl font-bold" >{averageRating}</h1>
                        <div className="flex flex-col gap-0">
                            <div className="flex gap-2">
                                {Array.from({length: Math.floor(averageRating)}).map((_, i) => (
                                    <StarFilledIcon key={i}/>
                                ))}
                                {Array.from({length: 5 - Math.floor(averageRating)}).map((_, i) => (
                                    <StarIcon key={i}/>
                                ))}
                            </div>
                            <p className="text-sm">{reviews.length} calificaciones</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        {[5,4,3,2,1].map((index) => (
                            <div key={index} className="flex gap-2 items-center">
                                <Progress className="h-1" value={reviews.filter((review:Review) => review.rating === index).length / reviews.length * 100}/>
                                <p className="text-xs text-gray-500">{index}</p>
                                <StarFilledIcon color="gray"/>
                            </div>
                        ))}
                    </div>
                    {(session && !myReview) && <AddReveiew userId={session.user?.id} bookId={bookId}/>}
                </div>
                <div className="flex flex-col gap-5">
                    {(session && myReview) && 
                        <div className="px-4 w-[350px]">
                            <ReviewCard review={myReview} owned={true}/>
                        </div>
                    }
                    <Tabs defaultValue="Todos" className="w-[400px]">
                        <TabsList>
                            <TabsTrigger value="Todos">Todos</TabsTrigger>
                            <TabsTrigger value="Mis amigos">Mis amigos</TabsTrigger>
                        </TabsList>
                        <TabsContent value="Todos">
                            <ScrollArea className="h-72 w-[350px] rounded-md p-4">
                                <div className="flex flex-col gap-4">
                                    {!reviewsFiltered.length && <h1 className="text-xl font-[500]">Este libro no tiene reseñas</h1>}
                                    {reviewsFiltered.map((review:Review, i:number) => (
                                        <ReviewCard key={i} review={review}/>
                                    ))}
                                </div>
                            </ScrollArea>
                        </TabsContent>
                        <TabsContent value="Mis amigos">
                            <ScrollArea className="h-72 w-[350px] rounded-md p-4">
                                <h1 className="text-xl font-[500]">No hay reseñas de tus amigos</h1>
                            </ScrollArea>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

function ReviewCard({review, owned}: {review: Review, owned?: boolean}) {
    return (
        <Card key={review.id}>
            <CardHeader className="pb-3 gap-1">
                <div className="flex justify-between">
                    <CardTitle>{review.user.username}</CardTitle>
                    <div className="flex gap-2 items-center">
                        <p className="text-sm text-gray-400">{new Date(review.createdAt).toLocaleDateString("en-GB")}</p>
                        {owned && (<EditReview review={review}/>)}
                    </div>
                </div>
                <CardDescription className="flex gap-1">
                    {Array.from({length: review.rating}).map((_, i) => (
                        <StarFilledIcon key={i}/>
                    ))}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>{review.description}</p>
            </CardContent>
        </Card>
    )
}