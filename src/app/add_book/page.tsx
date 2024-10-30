"use client"
import { SessionProvider } from "next-auth/react"
import AddBook from "./AddBook";


export default function Page() {
    return (
        <SessionProvider>
            <AddBook />
        </SessionProvider>
    );
}
