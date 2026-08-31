import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userid = searchParams.get("userid")

  let query = db.from("items").select("*, users!itesm_userid_fkey(fullname)")
  if (userid) {
    query = query.eq("userid", userid)
  }

  const { data, error } = await query
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  const mapped = (data ?? []).map((d: any) => ({
    ...d,
    claimant_name: d.users?.fullname ?? null,
    users: undefined,
  }))
  return NextResponse.json(mapped)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { data, error } = await db
    .from("items")
    .insert({
      name: body.name,
      category: body.category,
      zone: body.zone,
      image: body.image ?? null,
      isclaim: body.isclaim ?? false,
      userid: body.userid ?? null,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json(data, { status: 201 })
}

export async function PATCH(request: NextRequest) {
  const body = await request.json()
  const { id, ...updates } = body

  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 })
  }

  const { data, error } = await db
    .from("items")
    .update(updates)
    .eq("id", id)
    .select("*, users!itesm_userid_fkey(fullname)")
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  const mapped = {
    ...data,
    claimant_name: data.users?.fullname ?? null,
    users: undefined,
  }
  return NextResponse.json(mapped)
}
