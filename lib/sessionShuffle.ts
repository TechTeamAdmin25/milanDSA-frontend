export function sessionShuffle<T>(key: string, data: T[]) {
  if (typeof window === "undefined") return data;

  const cached = sessionStorage.getItem(key);
  if (cached) return JSON.parse(cached);

  const shuffled = [...data].sort(() => Math.random() - 0.5);
  sessionStorage.setItem(key, JSON.stringify(shuffled));
  return shuffled;
}
