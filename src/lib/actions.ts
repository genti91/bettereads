"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function revalidateAll(redirectTo?: string | undefined) {
    revalidatePath(`/`);
    if (redirectTo === undefined) return;
    redirect(redirectTo);
}