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
    username: z.string().min(1, "El nombre de usuario es requerido"),
    name: z.string().min(1, "El nombre es requerido"),
    picture: z.string(),
    password: z.string().min(1, "La contraseña es requerida"),
    repeatPassword: z.string().min(1, "La confirmación de la contraseña es requerida"),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Las contraseñas no coinciden",
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
            body: JSON.stringify({
                username: values.username,
                password: values.password,
                name: values.name,
                picture: values.picture
            }),
        })
        if (response.ok) {
            toast({
                description: "Usuario registrado"
            })
            form.reset();
            router.push("/auth/login");
        } else {
            toast({
                variant: "destructive",
                description: "Ocurrió un error"
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
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Nombre</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nombre" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="username"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Nombre de usuario</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nombre de usuario" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="picture"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Imagen de perfil</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center space-x-3">
                                            <Input placeholder="Imagen URL" {...field} />
                                            <Avatar className="bg-slate-200 items-center justify-center hover:bg-slate-100">
                                                <AvatarImage src={field.value} className=" content-center"/>
                                                <AvatarFallback>P</AvatarFallback>
                                            </Avatar>
                                        </div>
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
                                    <FormLabel>Contraseña</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Contraseña" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="repeatPassword"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Repetir contraseña</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Contraseña" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-col">
                        <Button type="submit">Registrarse</Button>
                        <Link href="/auth/login" className="mt-3.5">
                            <Button variant="secondary" className="w-full">Iniciar sesión</Button>
                        </Link>
                    </div>
                </form>
            </Form>
        </div>
    </div>
  );
}
