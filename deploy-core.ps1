npm run build
npx @opennextjs/cloudflare build
npx wrangler pages deploy .open-next/assets --project-name tcb-bank-ui --d1 LEDGER_DB=tcb-ledger-v2
