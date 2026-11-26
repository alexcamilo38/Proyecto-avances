export const getTeacherName = (profile) => {
  const user = profile?.user;
  const name = [
    user?.first_name,
    user?.middle_name,
    user?.last_name,
    user?.second_last_name,
  ]
    .map((part) => part?.trim())
    .filter(Boolean)
    .join(" ");

  return name || "—";
};

export const getTeacherInitials = (profile) => {
  const user = profile?.user;
  const firstName = user?.first_name?.trim();
  const lastName = (user?.second_last_name || user?.last_name || user?.middle_name)?.trim();
  const initials = `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toLocaleUpperCase();

  return initials || "—";
};

export const displayTeacherValue = (value) => {
  if (value === null || value === undefined || String(value).trim() === "") return "—";
  return value;
};
