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
import {revalidateAll} from "@/lib/actions";
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
    username: z.string().min(1, "username is required"),
    password: z.string().min(1, "password is required")
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

    async function onSubmitRegister(values: z.infer<typeof formSchema>) {
        const res = await fetch("/api/users");
        const users = res.ok ? await res.json() : [];
        const userExists = users.some((user: { username: string }) => user.username === values.username);

        if (userExists) {
            toast({
                variant: "destructive",
                description: "El usuario ya existe"
            })
            form.reset();
            return;
        }

        const response = await fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({...values}),
        })
        if (response.ok) {
            toast({
                description: "Usuario registrado"
            })
            form.reset();
            await onSubmit(values);
            await revalidateAll();
        } else {
            toast({
                variant: "destructive",
                description: "Ocurrió un error"
            })
        }
    }

  return (
    <div className="sm:px-20 sm:py-10 font-[family-name:var(--font-geist-sans)]">
        <div className="flex flex-col items-center">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7 w-1/3 flex flex-col">
                    <div className="space-y-3">

                        <FormField
                            control={form.control}
                            name="username"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>User Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="User Name" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Password" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                    </div>
                    <Button type="submit">Iniciar sesión</Button>
                </form>

                <form onSubmit={form.handleSubmit(onSubmitRegister)} className="mt-3.5 w-1/3">
                    <Button type="submit" variant="secondary" className="w-full">Registrarse</Button>
                </form>
            </Form>
        </div>
    </div>
  );
}
