import { createClient } from '@upstash/redis';

const redis = createClient({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', async () => {
    const text = body.trim() || 'default';
    await redis.set('custom_response', text);
    res.status(200).json({ ok: true });
  });
}