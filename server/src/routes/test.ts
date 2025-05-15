import { Router } from "express";
import redis from "../config/redisClient";

const router = Router();

router.get("/redis-test", async (req, res) => {
    try {
        await redis.set("test-key", "Hello Redis!", { EX: 60 });
        const value = await redis.get("test-key");
        res.json({ success: true, message: value });
    } catch (err) {
        console.error("Redis error:", err);
        res.status(500).json({ success: false, error: "Redis test failed" });
    }
});

export default router;
