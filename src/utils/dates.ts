/* eslint-disable no-bitwise */

import { add, formatDistanceToNow, isAfter } from 'date-fns';

// Small, fast seeded PRNG (Mulberry32)
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Random date in [now-6m, now+6m], deterministic per index.
 * @param {number} index - position of the item in your array
 * @returns {Date}
 */
export function randomDate6m(index: number): Date {
  const now = new Date();

  const start = new Date(now);
  start.setMonth(start.getMonth() - 6);

  const end = new Date(now);
  end.setMonth(end.getMonth() + 6);

  const rng = mulberry32(index + 1); // index-aware, stable
  const startMs = start.getTime();
  const spanMs = end.getTime() - startMs;

  // Pick a millisecond uniformly in the range
  const t = startMs + Math.floor(rng() * (spanMs + 1));
  return new Date(t);
}

export const formatBidDate = (date: Date | string) => {
  return isAfter(new Date(), add(new Date(date), { days: 1 }))
    ? { ended: true, message: 'Auction ended' }
    : { ended: false, message: formatDistanceToNow(new Date(date)) };
};
