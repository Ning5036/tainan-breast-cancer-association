// Visitor counter using Vercel Managed Redis
// Falls back to in-memory count when Redis is not configured

import { createClient } from "redis";

let memoryCount = 0;

async function withRedis<T>(
  fn: (client: ReturnType<typeof createClient>) => Promise<T>,
): Promise<T | null> {
  const url = process.env.REDIS_URL;
  if (!url) return null;

  const client = createClient({ url });
  try {
    await client.connect();
    const result = await fn(client);
    await client.disconnect();
    return result;
  } catch {
    try {
      await client.disconnect();
    } catch {}
    return null;
  }
}

export async function getVisitorCount(): Promise<number> {
  const result = await withRedis(async (client) => {
    const val = await client.get("visitor_count");
    return val ? parseInt(val, 10) : 0;
  });
  return result ?? memoryCount;
}

export async function incrementVisitorCount(): Promise<number> {
  const result = await withRedis(async (client) => {
    const val = await client.incr("visitor_count");
    return val;
  });
  if (result !== null) return result;
  memoryCount += 1;
  return memoryCount;
}
