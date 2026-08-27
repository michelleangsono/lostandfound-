import { db } from "@/lib/supabase"
import { User } from "@/lib/types"

export const createUser = async ({ email, fullname, password }: User) => {
    const { data, error } = await db.from("users").insert({ email, fullname, password })
    if (error) {
        console.error("Error creating user:", error)
        throw error
    }
    return true
}

export const verifyUser = async ({ email, password }: User): Promise<boolean> => {
    const { data, error } = await db.from("users").select("*").eq("email", email).eq("password", password)
    if (error) {
        console.error("Error verifying user:", error)
        throw error
    }
    if (data && data.length > 0) {
        sessionStorage.setItem("user", JSON.stringify(data[0]))
        return true
    }
    return false
}