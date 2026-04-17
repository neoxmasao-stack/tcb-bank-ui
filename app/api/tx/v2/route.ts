import { NextResponse } from "next/server";
export const runtime = "edge";
export async function POST(req: Request) {
  const startAt = Date.now();
  try {
    const body = await req.json();
    const { idempotencyKey, amount, accountTo } = body;
    if (!idempotencyKey || !amount || amount <= 0) throw new Error("INVALID_PAYLOAD");
    return NextResponse.json({ status: "COMMITTED", txId: crypto.randomUUID(), idempotencyKey, latency: `${Date.now() - startAt}ms`, audit: `TX_INIT: ${idempotencyKey}` });
  } catch (e: any) { return NextResponse.json({ status: "ABORTED", error: e.message }, { status: 500 }); }
}
