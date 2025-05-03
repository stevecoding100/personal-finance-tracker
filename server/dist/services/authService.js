"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userModel_1 = require("../models/userModel");
const jwt_1 = require("../utils/jwt");
const registerUser = async (name, email, password) => {
    const existingUser = await (0, userModel_1.getUserByEmail)(email);
    if (existingUser) {
        throw new Error("User already exists");
    }
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    const user = await (0, userModel_1.createUser)({ name, email, password: hashedPassword });
    const token = (0, jwt_1.createToken)({ id: user.id, email: user.email });
    return { user, token };
};
exports.registerUser = registerUser;
const loginUser = async (email, password) => {
    const user = await (0, userModel_1.getUserByEmail)(email);
    if (!user) {
        throw new Error("Invalid email or password");
    }
    const isMatch = await bcryptjs_1.default.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid email or password");
    }
    const token = (0, jwt_1.createToken)({ id: user.id, email: user.email });
    return { user, token };
};
exports.loginUser = loginUser;
const getUser = async (id) => {
    const user = await (0, userModel_1.getUserById)(id);
    if (!user) {
        throw new Error("Cannot find user");
    }
    return user;
};
exports.getUser = getUser;
