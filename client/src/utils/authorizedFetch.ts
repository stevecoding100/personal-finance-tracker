export const authorizedFetch = async (
    url: string,
    options: RequestInit = {}
): Promise<Response> => {
    const userString = localStorage.getItem("user");
    const token = userString ? JSON.parse(userString).token : null;

    // Explicitly define headers as a string record
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(options.headers as Record<string, string>),
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    return fetch(url, {
        ...options,
        headers,
    });
};
