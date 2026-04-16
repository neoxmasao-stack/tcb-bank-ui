import { NextRequest, NextResponse } from 'next/server';
export const runtime = 'edge';
export async function POST(req: NextRequest) {
  const { LEDGER_DB } = (process.env as any);
  try {
    const body = await req.json();
    const txId = crypto.randomUUID();
    await LEDGER_DB.prepare("INSERT INTO ledger (id, holder_name, amount, status, type, account_from, account_to) VALUES (?, ?, ?, 'SETTLED', 'TRANSFER', ?, ?)")
      .bind(txId, body.holderName, body.amount, body.from, body.to).run();
    await LEDGER_DB.prepare("INSERT INTO audit_log (tx_id, type, amount, currency, status) VALUES (?, 'TRANSFER', ?, 'JPY', 'COMPLETED')")
      .bind(txId, body.amount).run();
    return NextResponse.json({ success: true, txId });
  } catch (e: any) { return NextResponse.json({ success: false, error: e.message }, { status: 500 }); }
}
