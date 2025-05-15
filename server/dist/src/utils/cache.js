"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidateCache = exports.getOrSetCache = void 0;
const redisClient_1 = __importDefault(require("../config/redisClient"));
const getOrSetCache = async (key, ttlSeconds, fetchFn) => {
    const cached = await redisClient_1.default.get(key);
    if (cached) {
        return JSON.parse(cached);
    }
    const freshData = await fetchFn();
    await redisClient_1.default.setEx(key, ttlSeconds, JSON.stringify(freshData));
    return freshData;
};
exports.getOrSetCache = getOrSetCache;
const invalidateCache = async (key) => {
    await redisClient_1.default.del(key);
};
exports.invalidateCache = invalidateCache;
