import { NextResponse } from "next/server"
import { db } from "@/lib/supabase"

export async function GET() {
  const { data, error } = await db.from("items").select("*")

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
