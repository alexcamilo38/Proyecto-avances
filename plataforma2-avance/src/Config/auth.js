export const AUTH_SESSION_KEY = "easymatric.auth";

export const getAuthSession = () => {
    const storedSession = localStorage.getItem(AUTH_SESSION_KEY);
    return storedSession ? JSON.parse(storedSession) : null;
};

export const saveAuthSession = (session) => {
    localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
};

export const clearAuthSession = () => {
    localStorage.removeItem(AUTH_SESSION_KEY);
};
