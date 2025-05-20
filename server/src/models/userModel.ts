import { db } from "../db/db";

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date;
}

export const createUser = async (
    userData: Omit<User, "id" | "created_at" | "updated_at">
) => {
    try {
        const newUser = await db<User>("users")
            .insert({
                ...userData,
                created_at: new Date(),
                updated_at: new Date(),
            })
            .returning("*");
        return newUser[0];
    } catch (error: any) {
        throw new Error(`Error creating user: ${error.message}`);
    }
};

export const getUserById = async (id: number) => {
    try {
        const user = await db<User>("users").where("id", id).first();
        return user;
    } catch (error: any) {
        throw new Error(`Error fetching user by ID: ${error.message}`);
    }
};

export const getUserByEmail = async (email: string) => {
    try {
        const user = await db<User>("users").where("email", email).first();
        return user;
    } catch (error: any) {
        console.error(">>> getUserByEmail error:", error);
        throw new Error(`Error fetching user by email: ${error.message}`);
    }
};
