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

const formSchema = z.object({
    username: z.string().min(1, "username is required"),
    password: z.string().min(1, "password is required")
  })

export default function SignIn({ params, searchParams }: { params: { id: string }, searchParams: { [key: string]: string | string[] | undefined } }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: ""
        },
    })
    
    async function onSubmit(values: z.infer<typeof formSchema>) {
      const res = await signIn("credentials", {
        redirect: false,
        username: values.username,
        password: values.password,
      })
    
      if (res?.ok) {
        window.location.href = "/profile"
      } else {
        alert("Usuario o contraseña incorrectos")
        window.location.href = "/auth"
      }
    }
  return (
    <div className="sm:px-20 sm:py-10 font-[family-name:var(--font-geist-sans)]">
        <div className="flex flex-col items-center">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-1/3 flex flex-col gap-8">
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
                    <Button type="submit" >Submit</Button>
                </form>
            </Form>
        </div>
    </div>
  );
}
