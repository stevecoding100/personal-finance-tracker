// // routes/test.ts
// import express from "express";
// import redisClient from "../utils/redisClient";

// const router = express.Router();

// router.get("/redis-test", async (_req, res) => {
//     if (!redisClient) {
//         return res.status(503).json({ message: "Redis not available" });
//     }

//     try {
//         await redisClient.set("test-key", "Redis is working!");
//         const value = await redisClient.get("test-key");
//         return res.json({ message: "Redis says:", value });
//     } catch (error) {
//         console.error("Redis error:", error);
//         return res.status(500).json({ error: "Redis error" });
//     }
// });

// export default router;
