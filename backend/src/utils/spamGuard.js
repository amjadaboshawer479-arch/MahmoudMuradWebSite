/**
 * Lightweight, dependency-free profanity/spam guard.
 * Not a substitute for human moderation — every review still goes
 * through the pending -> approved workflow. This just auto-flags
 * obvious spam so the admin can spot it faster.
 */

const BLOCKED_PATTERNS = [
  /https?:\/\//i, // links — reviews shouldn't need them
  /\b\d{9,}\b/, // long digit runs (phone/spam numbers)
  /viagra|casino|crypto\s*airdrop|forex\s*signal/i,
];

export function looksLikeSpam(text) {
  if (!text || typeof text !== 'string') return true;
  const trimmed = text.trim();
  if (trimmed.length < 3) return true;
  return BLOCKED_PATTERNS.some((pattern) => pattern.test(trimmed));
}

export function isHoneypotTripped(honeypotValue) {
  return typeof honeypotValue === 'string' && honeypotValue.trim().length > 0;
}
