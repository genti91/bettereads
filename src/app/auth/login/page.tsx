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
import { signIn } from "next-auth/react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

const formSchema = z.object({
    username: z.string().min(1, "This field is required"),
    password: z.string().min(1, "This field is required")
})

export default function SignIn() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: ""
        },
    })

    const { toast } = useToast();

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const res = await signIn("credentials", {
            redirect: false,
            username: values.username,
            password: values.password,
        })

        if (res?.ok) {
            window.location.href = "/"
        } else {
            toast({
                variant: "destructive",
                description: "Usuario o contraseña incorrectos"
            })
            form.reset();
            return;
        }
    }

    return (
        <div className="sm:px-20 py-10 font-[family-name:var(--font-geist-sans)]">
            <div className="flex flex-col items-center">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7 md:w-1/4 flex flex-col">
                        <div className="space-y-3">

                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>User Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="User Name" {...field} />
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

                        </div>
                        <div className="flex flex-col">
                            <Button type="submit">Log In</Button>
                            <Link href="/auth/register" className="mt-3.5">
                                <Button type="submit" variant="secondary" className="w-full">Sign In</Button>
                            </Link>
                        </div>
                    </form>

                </Form>
            </div>
        </div>
    );
}
