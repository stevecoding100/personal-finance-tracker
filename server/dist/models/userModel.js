"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmail = exports.getUserById = exports.createUser = void 0;
const db_1 = require("../db/db");
const createUser = async (userData) => {
    try {
        const newUser = await (0, db_1.db)("users")
            .insert({
            ...userData,
            created_at: new Date(),
            updated_at: new Date(),
        })
            .returning("*");
        return newUser[0];
    }
    catch (error) {
        throw new Error(`Error creating user: ${error.message}`);
    }
};
exports.createUser = createUser;
const getUserById = async (id) => {
    try {
        const user = await (0, db_1.db)("users").where("id", id).first();
        return user;
    }
    catch (error) {
        throw new Error(`Error fetching user by ID: ${error.message}`);
    }
};
exports.getUserById = getUserById;
const getUserByEmail = async (email) => {
    try {
        const user = await (0, db_1.db)("users").where("email", email).first();
        return user;
    }
    catch (error) {
        throw new Error(`Error fetching user by email: ${error.message}`);
    }
};
exports.getUserByEmail = getUserByEmail;
