export const authorizedFetch = async (
    url: string,
    options: RequestInit = {}
): Promise<Response> => {
    const token = localStorage.getItem("token");

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
