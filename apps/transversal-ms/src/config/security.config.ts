import { registerAs } from '@nestjs/config';

/**
 * Endurecimiento HTTP (rate limit en app; WAF en API Gateway si el servicio es público).
 */
export default registerAs('security', () => {
  const trust_raw = process.env.TRUST_PROXY_HOPS ?? '0';
  const trust_proxy_hops = Number.parseInt(trust_raw, 10);
  return {
    trust_proxy_hops: Number.isFinite(trust_proxy_hops) ? Math.max(0, trust_proxy_hops) : 0,
    http_throttle: {
      ttl_ms: Number.parseInt(process.env.HTTP_THROTTLE_TTL_MS ?? '60000', 10) || 60_000,
      limit: Number.parseInt(process.env.HTTP_THROTTLE_LIMIT ?? '120', 10) || 120,
    },
  };
});
