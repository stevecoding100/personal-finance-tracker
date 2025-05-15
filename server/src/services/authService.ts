import bcrypt from "bcryptjs";
import { createUser, getUserByEmail, getUserById } from "../models/userModel";
import { createToken } from "../utils/jwt";

export const registerUser = async (
    name: string,
    email: string,
    password: string
) => {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser({ name, email, password: hashedPassword });

    const token = createToken({
        id: user.id,
        email: user.email,
        name: user.name,
    });

    // Remove password before returning
    const { password: _pw, ...safeUser } = user;

    return { user: safeUser, token };
};

export const loginUser = async (email: string, password: string) => {
    const user = await getUserByEmail(email);
    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid email or password");
    }

    const token = createToken({
        id: user.id,
        email: user.email,
        name: user.name,
    });

    // Remove password before returning
    const { password: _pw, ...safeUser } = user;

    return { user: safeUser, token };
};

export const getUser = async (userId: number) => {
    const user = await getUserById(userId);
    if (!user) {
        throw new Error("Cannot find user");
    }
    // Remove password before returning
    const { id, name, email } = user;
    return { id, name, email };
};
