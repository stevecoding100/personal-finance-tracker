import { authorizedFetch } from "../../utils/api";

const API_URL = import.meta.env.VITE_API_URL;

export const login = async (email: string, password: string) => {
    const res = await authorizedFetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Login failed");
    const data = await res.json();

    const user = {
        id: data.id,
        name: data.name,
        email: data.email,
        token: data.token,
    };
    localStorage.setItem("user", JSON.stringify(user));
    return user;
};

export const register = async (
    name: string,
    email: string,
    password: string
) => {
    const res = await authorizedFetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
    });
    if (!res.ok) throw new Error("Registration failed");
    const data = await res.json();

    const user = {
        id: data.id,
        name: data.name,
        email: data.email,
        token: data.token,
    };
    localStorage.setItem("user", JSON.stringify(user));
    return user;
};
