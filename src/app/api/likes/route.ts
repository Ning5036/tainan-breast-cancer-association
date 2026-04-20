import { NextRequest, NextResponse } from "next/server";

// In-memory store (resets on server restart)
// For production, use Vercel KV or a database
const likeCounts: Record<string, number> = {};

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ count: 0 });

  try {
    const { kv } = await import("@vercel/kv");
    const count = await kv.get<number>(`likes:${id}`);
    return NextResponse.json({ count: count || 0 });
  } catch {
    return NextResponse.json({ count: likeCounts[id] || 0 });
  }
}

export async function POST(request: NextRequest) {
  const { id } = await request.json();
  if (!id) return NextResponse.json({ count: 0 });

  try {
    const { kv } = await import("@vercel/kv");
    const count = await kv.incr(`likes:${id}`);
    return NextResponse.json({ count });
  } catch {
    likeCounts[id] = (likeCounts[id] || 0) + 1;
    return NextResponse.json({ count: likeCounts[id] });
  }
}
