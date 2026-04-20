// Visitor counter
// Uses Upstash Redis REST API when configured, falls back to in-memory

let memoryCount = 0;

async function redisRequest(command: string[]): Promise<any> {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;

  const res = await fetch(`${url}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
  });

  if (!res.ok) return null;
  const data = await res.json();
  return data.result;
}

export async function getVisitorCount(): Promise<number> {
  try {
    const result = await redisRequest(["GET", "visitor_count"]);
    if (result !== null) return parseInt(result, 10) || 0;
    return memoryCount;
  } catch {
    return memoryCount;
  }
}

export async function incrementVisitorCount(): Promise<number> {
  try {
    const result = await redisRequest(["INCR", "visitor_count"]);
    if (result !== null) return result;
    memoryCount += 1;
    return memoryCount;
  } catch {
    memoryCount += 1;
    return memoryCount;
  }
}
