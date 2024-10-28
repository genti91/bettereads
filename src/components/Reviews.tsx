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
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export default async function Reviews({reviews, bookId}:any) {
    const session = await getServerSession(authOptions)
    return (
        <div className="flex flex-col gap-4">
            <h1 className="font-[500] text-2xl">Opiniones del libro</h1>
            <div className="flex gap-8">
                <div className="flex flex-col gap-3">
                    <div className="flex gap-4 items-center">
                        <h1 className="text-4xl font-bold" >4</h1>
                        <div className="flex flex-col gap-0">
                            <div className="flex gap-2">
                                <StarFilledIcon/>
                                <StarFilledIcon/>
                                <StarFilledIcon/>
                                <StarFilledIcon/>
                                <StarIcon/>
                            </div>
                            <p className="text-sm" style={{lineHeight:"16px"}}>24 calificaciones</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        {reviews.map((rating:any, index:number) => (
                            <div className="flex gap-2 items-center">
                                <Progress className="h-1" value={index * 20} />
                                <p className="text-xs text-gray-500">{index}</p>
                                <StarFilledIcon color="gray"/>
                            </div>
                        ))}
                    </div>
                    {session && <AddReveiew userId={session.user?.id} bookId={bookId}/>}
                </div>
                <Tabs defaultValue="Todos" className="w-[400px]">
                    <TabsList>
                        <TabsTrigger value="Todos">Todos</TabsTrigger>
                        <TabsTrigger value="Mis amigos">Mis amigos</TabsTrigger>
                    </TabsList>
                    <TabsContent value="Todos">
                        <ScrollArea className="h-72 w-[350px] rounded-md p-4">
                            <div className="flex flex-col gap-4">
                                {false && <h1 className="text-xl font-[500]">Este libro no tiene reseñas</h1>}
                                {Array.from({ length: 10 }).map((_, i) => (
                                    <Card key={i}>
                                        <CardHeader className="pb-3 gap-1">
                                            <div className="flex justify-between">
                                                <CardTitle>Harper Lee</CardTitle>
                                                <p className="text-sm text-gray-400">10/26/2024</p>
                                            </div>
                                            <CardDescription className="flex gap-1">
                                                <StarFilledIcon/>
                                                <StarFilledIcon/>
                                                <StarFilledIcon/>
                                                <StarFilledIcon/>
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p>A novel about the serious issues of rape and racial inequality.</p>
                                        </CardContent>
                                    </Card>
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
    )
}