"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const formSchema = z.object({
    username: z.string().min(1, "This field is required"),
    name: z.string().min(1, "This field is required"),
    picture: z.string(),
    password: z.string().min(1, "This field is required"),
    repeatPassword: z.string().min(1, "This field is required"),
})
    .refine((data) => data.password === data.repeatPassword, {
        message: "Passwords don't match",
        path: ["repeatPassword"],
    });


export default function SignIn() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
            repeatPassword: "",
            name: "",
            picture: ""
        },
    })

    const { toast } = useToast();
    const router = useRouter();


    async function onSubmit(values: z.infer<typeof formSchema>) {
        const res = await fetch("/api/users");
        const users = res.ok ? await res.json() : [];
        const userExists = users.some((user: { username: string }) => user.username === values.username);

        if (userExists) {
            toast({
                variant: "destructive",
                description: "This user already exists"
            })
            form.reset();
            return;
        }

        const response = await fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: values.username,
                password: values.password,
                name: values.name,
                picture: values.picture
            }),
        })
        if (response.ok) {
            toast({
                description: "User signed in"
            })
            form.reset();
            router.push("/auth/login");
        } else {
            toast({
                variant: "destructive",
                description: "An error ocurred"
            })
        }
    }

    return (
        <div className="sm:px-20 py-10 font-[family-name:var(--font-geist-sans)]">
            <div className="flex flex-col items-center">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7 flex flex-col md:w-1/4">
                        <div className="space-y-3">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Username" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="picture"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Profile picture</FormLabel>
                                        <FormControl>
                                            <div className="flex items-center space-x-3">
                                                <Input placeholder="Image URL" {...field} />
                                                <Avatar className="bg-slate-200 items-center justify-center hover:bg-slate-100">
                                                    <AvatarImage src={field.value} className=" content-center" />
                                                    <AvatarFallback>P</AvatarFallback>
                                                </Avatar>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="repeatPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Rewrite Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex flex-col">
                            <Button type="submit">Sign In</Button>
                            <Link href="/auth/login" className="mt-3.5">
                                <Button variant="secondary" className="w-full">Log In</Button>
                            </Link>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
