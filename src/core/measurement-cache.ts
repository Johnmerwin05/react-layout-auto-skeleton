import type { SkeletonSnapshot } from '../types';
const cache = new Map<string, SkeletonSnapshot>();
export const skeletonCache = {
  get(key: string) { return cache.get(key); },
  set(key: string, value: SkeletonSnapshot) { cache.set(key, value); },
  delete(key: string) { cache.delete(key); },
  clear() { cache.clear(); },
  get size() { return cache.size; },
};
