// "use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"



export default function Reviews() {
    return (
        <div>
            <h1 className="font-bold text-2xl">Reviews</h1>


            <Tabs defaultValue="Todos" className="w-[400px]">
                <TabsList>
                    <TabsTrigger value="Todos">Todos</TabsTrigger>
                    <TabsTrigger value="Mis amigos">Mis amigos</TabsTrigger>
                </TabsList>
                <TabsContent value="Todos">Reviews de todos</TabsContent>
                <TabsContent value="Mis amigos">Reviews de mis amigos</TabsContent>
            </Tabs>

        </div>
    )
}