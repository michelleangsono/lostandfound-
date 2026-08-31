import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get("url")

  if (!url) {
    return new Response("url is required", { status: 400 })
  }

  try {
    const res = await fetch(url)
    if (!res.ok) {
      return new Response("Failed to fetch image", { status: 502 })
    }
    const contentType = res.headers.get("content-type") || "image/jpeg"
    const buffer = await res.arrayBuffer()

    return new Response(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400",
      },
    })
  } catch {
    return new Response("Failed to fetch image", { status: 500 })
  }
}
