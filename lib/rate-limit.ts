// lib/rate-limit.ts

const counts = new Map<string, { count: number; lastReset: number }>();

export async function rateLimit(options: { limit: number; windowMs: number }) {
  return {
    check: async (ip: string) => {
      const now = Date.now();
      const user = counts.get(ip) || { count: 0, lastReset: now };

      // Zaman penceresi dolduysa sıfırla
      if (now - user.lastReset > options.windowMs) {
        user.count = 0;
        user.lastReset = now;
      }

      if (user.count >= options.limit) {
        return { success: false };
      }

      user.count++;
      counts.set(ip, user);

      return { success: true };
    },
  };
}

export const analysisLimiter = {
  limit: 3, // 1 dakikada 3 deneme
  windowMs: 60 * 1000,
};
