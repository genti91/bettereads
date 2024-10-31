"use client";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { signOut } from "next-auth/react";


export default function ProfileIconMenue ({profileImage}: {profileImage: string}) {
  return (
    <div>
      <Menubar className="shadow-none space-x-0 p-0 border-none">
      <MenubarMenu>
        <MenubarTrigger className="px-0 py-0 focus:bg-white data-[state=open]:bg-white cursor-pointer">
          <Avatar className="bg-slate-200 items-center justify-center hover:bg-slate-100">
            <AvatarImage src={profileImage}/>
            <AvatarFallback>P</AvatarFallback>
          </Avatar>
        </MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup value="">
            <Link href="/profile">
              <MenubarRadioItem className="cursor-pointer" value="mi_perfil">Mi Perfil</MenubarRadioItem>
            </Link>
            <MenubarSeparator />
            <Link href="/my_books">
              <MenubarRadioItem className="cursor-pointer" value="mis_libros">Mis libros</MenubarRadioItem>
            </Link>
            <Link href="/add_book">
              <MenubarRadioItem className="cursor-pointer" value="añadir_libro">Añadir libro</MenubarRadioItem>
            </Link>
          </MenubarRadioGroup>
          <MenubarSeparator />
          <MenubarItem className="cursor-pointer" onClick={() => signOut()} inset>Cerrar sesión</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
    </div>
  )
}