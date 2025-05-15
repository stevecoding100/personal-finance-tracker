"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
const redisClient = (0, redis_1.createClient)({
    url: redisUrl,
});
redisClient.on("error", (err) => console.error("Redis Client Error", err));
(async () => {
    await redisClient.connect();
})();
exports.default = redisClient;
