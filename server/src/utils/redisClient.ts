// import { createClient, RedisClientType } from "redis";

// let redisClient: RedisClientType | null = null;
// const redisUrl = process.env.REDIS_URL;

// if (redisUrl) {
//     try {
//         const url = new URL(redisUrl);
//         const isSecure = url.protocol === "rediss:";

//         redisClient = createClient({
//             url: redisUrl,
//             socket: isSecure
//                 ? {
//                       tls: true,
//                       host: url.hostname,
//                   }
//                 : {
//                       host: url.hostname,
//                       port: Number(url.port),
//                   },
//         });

//         redisClient.connect().catch((err) => {
//             console.error("Redis connection failed:", err);
//         });
//     } catch (error) {
//         console.error("Invalid REDIS_URL format:", error);
//     }
// } else {
//     console.warn("REDIS_URL is not set. Redis is disabled.");
// }
// export default redisClient;
// utils/redisClient.ts

import { createClient } from "redis";

const redisUrl = process.env.REDIS_URL;

const redisClient = redisUrl ? createClient({ url: redisUrl }) : null;

if (redisClient) {
    redisClient.on("error", (err) => {
        console.error("Redis Client Error", err);
    });

    redisClient.connect().catch((err) => {
        console.error("Redis connection failed:", err);
    });
} else {
    console.warn("REDIS_URL is not set. Redis is disabled.");
}

export default redisClient;
