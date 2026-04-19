// Visitor counter using Vercel KV (Upstash Redis)
// Falls back to in-memory count when KV is not configured

let memoryCount = 10000; // Fallback starting count

export async function getVisitorCount(): Promise<number> {
  try {
    const { kv } = await import("@vercel/kv");
    const count = await kv.get<number>("visitor_count");
    return count || 0;
  } catch {
    return memoryCount;
  }
}

export async function incrementVisitorCount(): Promise<number> {
  try {
    const { kv } = await import("@vercel/kv");
    const count = await kv.incr("visitor_count");
    return count;
  } catch {
    memoryCount += 1;
    return memoryCount;
  }
}
