import crypto from 'crypto';

/**
 * We never store raw IP addresses — only a salted hash, just enough
 * to rate-limit / spot abuse patterns without keeping personal data.
 */
export function hashIp(ip) {
  const salt = process.env.IP_HASH_SALT || 'change-me-in-env';
  return crypto.createHash('sha256').update(`${salt}:${ip}`).digest('hex');
}
