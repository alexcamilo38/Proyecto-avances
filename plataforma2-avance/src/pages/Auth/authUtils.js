const CURRENT_USER_KEY = "easymatric.current-user";

export const storeCurrentUser = (user) => {
  const id = user?.id ?? user?.user_system_id;
  if (id == null) {
    sessionStorage.removeItem(CURRENT_USER_KEY);
    return;
  }
  sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify({ id }));
};

export const getCurrentUserId = () => {
  const storedUser = sessionStorage.getItem(CURRENT_USER_KEY);
  if (!storedUser) return null;
  return JSON.parse(storedUser)?.id ?? null;
};

export const clearCurrentUser = () => {
  sessionStorage.removeItem(CURRENT_USER_KEY);
};

export const getCollection = (responseData, collectionName) => {
  if (Array.isArray(responseData)) return responseData;
  if (Array.isArray(responseData?.data)) return responseData.data;
  if (Array.isArray(responseData?.[collectionName])) return responseData[collectionName];
  if (Array.isArray(responseData?.data?.[collectionName])) return responseData.data[collectionName];
  if (Array.isArray(responseData?.data?.data)) return responseData.data.data;

  throw new Error(`El servidor devolvió una respuesta inesperada al consultar ${collectionName}.`);
};

export const slugify = (value) => value
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "");

export const getApiErrorMessage = (error, fallback) => {
  const validationErrors = error.response?.data?.errors;
  const firstValidationError = validationErrors && Object.values(validationErrors).flat()[0];

  return firstValidationError || error.response?.data?.message || error.message || fallback;
};

const roleAliases = {
  admin: ["admin", "administrador", "administrator"],
  rector: ["rector", "directivo"],
  teacher: ["docente", "teacher", "profesor", "profesora"],
  student: ["estudiante", "student", "aspirante"],
};

export const getDashboardPath = (roleValue) => {
  const normalizedRole = slugify(String(roleValue || ""));

  for (const [role, aliases] of Object.entries(roleAliases)) {
    if (aliases.includes(normalizedRole)) {
      return {
        admin: "/admin",
        rector: "/rector",
        teacher: "/teacher",
        student: "/student",
      }[role];
    }
  }

  return null;
};

export const findRole = (roles, roleKey) => {
  const aliases = roleAliases[roleKey] || [];
  return roles.find((role) => (
    aliases.includes(slugify(role.slug || "")) ||
    aliases.includes(slugify(role.name_role || ""))
  ));
};
