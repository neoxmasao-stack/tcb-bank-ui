import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { amount, target_bank, nation_id, uetr } = req.body;
  const db = (process.env as any).DB;
  try {
    await db.batch([
      db.prepare("INSERT INTO ledger (amount, type, status, target_bank, region) VALUES (?, 'TRANSFER', 'COMPLETED', ?, ?)").bind(amount, target_bank, nation_id),
      db.prepare("INSERT INTO audit_log (tx_id, type, amount, status, description) VALUES (?, 'ISO20022_OUTBOUND', ?, 'VERIFIED', ?)").bind(uetr, amount, 'TCB-GPI-SENT: [NATION:' + nation_id + '] [GATEWAY:FORM3] [PROTOCOL:MTLS]')
    ]);
    res.status(200).json({ status: 'MISSION_COMPLETE', uetr });
  } catch (e: any) {
    res.status(500).json({ status: 'PROTOCOL_ERROR', error: e.message });
  }
}
