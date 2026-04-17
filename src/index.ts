import { Hono } from 'hono';

const app = new Hono();

// ===== STATE =====
let halted = false;
let ledger = [];
let nodes = ['TOKYO','OSAKA','NY','SG'];
let liquidity = { TOKYO: 1000000, OSAKA: 800000, NY: 1200000, SG: 600000 };

// ===== EVENT SOURCING =====
const emit = (event) => {
  ledger.push({ ...event, ts: Date.now() });
};

// ===== RTGS MOCK (ISO20022風) =====
const rtgs = async (tx) => {
  return {
    MsgId: crypto.randomUUID(),
    Sts: 'ACSC', // accepted settlement complete
    IntrBkSttlmAmt: tx.amount,
    DbtrAgt: tx.from,
    CdtrAgt: tx.to
  };
};

// ===== RISK ENGINE =====
const riskScore = (tx) => {
  let score = 0;
  if (tx.amount > 500000) score += 40;
  if (liquidity[tx.from] < tx.amount) score += 60;
  return score;
};

// ===== SEND =====
app.post('/v1/send', async (c) => {
  if (halted) return c.json({ error: 'HALTED' }, 503);

  const body = await c.req.json();
  const tx = {
    id: crypto.randomUUID(),
    amount: body.amount,
    from: body.from,
    to: body.to
  };

  emit({ type: 'INIT', tx });

  const risk = riskScore(tx);
  emit({ type: 'RISK', value: risk });

  if (risk > 70) {
    emit({ type: 'BLOCKED', tx });
    return c.json({ status: 'BLOCKED', risk });
  }

  emit({ type: 'LIQUIDITY_CHECK', tx });

  liquidity[tx.from] -= tx.amount;
  liquidity[tx.to] += tx.amount;

  const ack = await rtgs(tx);

  emit({ type: 'RTGS_ACK', ack });
  emit({ type: 'FINALIZED', tx });

  return c.json({ status: 'FINALIZED', ack, risk });
});

// ===== KILL SWITCH =====
app.post('/v1/control/halt', () => {
  halted = true;
  return new Response(JSON.stringify({ halted: true }));
});

// ===== STREAM =====
export default {
  fetch(req) {
    if (req.headers.get('Upgrade') === 'websocket') {
      const pair = new WebSocketPair();
      const [client, server] = Object.values(pair);
      server.accept();

      const interval = setInterval(() => {
        const heatmap = nodes.map(n => ({
          node: n,
          liquidity: liquidity[n],
          risk: Math.floor(Math.random()*100)
        }));

        server.send(JSON.stringify({
          ledger: ledger.slice(-5),
          heatmap
        }));
      }, 1000);

      server.addEventListener('close', () => clearInterval(interval));

      return new Response(null, { status: 101, webSocket: client });
    }

    return app.fetch(req);
  }
};
