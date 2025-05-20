"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMeController = exports.loginController = exports.registerController = void 0;
const authService = __importStar(require("../services/authService"));
const redisClient_1 = __importDefault(require("../config/redisClient"));
const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({
                error: "Name, email, and password are required.",
            });
            return;
        }
        const result = await authService.registerUser(name, email, password);
        const { user, token } = result;
        res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
            token,
        });
    }
    catch (err) {
        console.error("Register Error:", err.message);
        res.status(400).json({ error: err.message });
    }
};
exports.registerController = registerController;
const loginController = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({
            error: "Wrong email or password.",
        });
        return;
    }
    // Adding a Redis check to limit login attempts per IP or email.s
    const ip = req.ip;
    const key = `login_attempts:${ip}:${email}`;
    try {
        const attempts = parseInt((await redisClient_1.default.get(key)) || "0");
        if (attempts >= 5) {
            res.status(429).json({
                error: "Too many login attempts. Try again later.",
            });
        }
        const result = await authService.loginUser(email, req.body.password);
        const { user, token } = result;
        // Reset failed attempts on success
        await redisClient_1.default.del(key);
        res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
            token,
        });
    }
    catch (err) {
        // Increment attempt count on failure
        await redisClient_1.default.incr(key);
        await redisClient_1.default.expire(key, 60 * 5); // 5 min expiration
        res.status(401).json({ error: err.message });
    }
};
exports.loginController = loginController;
const getMeController = async (req, res) => {
    // Caching the user profile in Redis to reduce DB hits
    try {
        if (!req.user) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const cacheKey = `user:${req.user.id}`;
        const cached = await redisClient_1.default.get(cacheKey);
        if (cached) {
            res.status(200).json(JSON.parse(cached));
        }
        const user = await authService.getUser(req.user.id);
        await redisClient_1.default.set(cacheKey, JSON.stringify(user), { EX: 3600 }); // cache for 1hr
        res.status(200).json(user);
    }
    catch (err) {
        res.status(401).json({ error: err.message });
    }
};
exports.getMeController = getMeController;
