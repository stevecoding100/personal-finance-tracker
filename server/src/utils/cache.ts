import redisClient from "../config/redisClient";

export const getOrSetCache = async <T>(
    key: string,
    ttlSeconds: number,
    fetchFn: () => Promise<T>
): Promise<T> => {
    const cached = await redisClient.get(key);
    if (cached) {
        return JSON.parse(cached) as T;
    }

    const freshData = await fetchFn();
    await redisClient.setEx(key, ttlSeconds, JSON.stringify(freshData));
    return freshData;
};

export const invalidateCache = async (key: string): Promise<void> => {
    await redisClient.del(key);
};
