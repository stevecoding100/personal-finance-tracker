"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const redisClient_1 = __importDefault(require("../config/redisClient"));
const router = (0, express_1.Router)();
router.get("/redis-test", async (req, res) => {
    try {
        await redisClient_1.default.set("test-key", "Hello Redis!", { EX: 60 });
        const value = await redisClient_1.default.get("test-key");
        res.json({ success: true, message: value });
    }
    catch (err) {
        console.error("Redis error:", err);
        res.status(500).json({ success: false, error: "Redis test failed" });
    }
});
exports.default = router;
