import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TeacherSessionContext from "../Config/TeacherSessionContext";
import { getAuthSession } from "../Config/auth";
import api from "../Config/env";
import { getCurrentUserId } from "../pages/Auth/authUtils";
import { getTeacherInitials } from "../Config/teacherProfile";

const roleDetails = {
  admin: { title: "Administración", initials: "AD", profile: "/PerfilAd" },
  teacher: { title: "Docencia", initials: "CM", profile: "/PerfilDocente" },
  student: { title: "Estudiante", initials: "JE", profile: "/PerfilEst" },
  rector: { title: "Rector", initials: "RC", profile: "/PerfilRec" },
};

const getUserFromResponse = (responseData) => (
  responseData?.user_system
  || responseData?.user
  || responseData?.data?.user_system
  || responseData?.data?.user
  || responseData?.data?.data
  || responseData?.data
  || responseData
);

const getFirstAndLastName = (user) => [
  user?.first_name?.trim(),
  user?.last_name?.trim(),
].filter(Boolean).join(" ");

const getUserInitials = (user) => [
  user?.first_name?.trim()?.[0],
  user?.last_name?.trim()?.[0],
].filter(Boolean).join("").toLocaleUpperCase();

// Muestra un acceso al perfil con la foto de la cuenta y un respaldo con iniciales.
const Header = ({ role }) => {
  const { title, initials: defaultInitials, profile: profilePath } = roleDetails[role];
  const teacherSession = useContext(TeacherSessionContext);
  const teacherUser = role === "teacher" ? teacherSession?.profile?.user : null;
  const defaultProfileInitials = role === "teacher"
    ? getTeacherInitials(teacherSession?.profile)
    : defaultInitials;
  const teacherPhoto = teacherUser?.photo_url || "";
  const teacherName = getFirstAndLastName(teacherUser);
  const [profilePhoto, setProfilePhoto] = useState(teacherPhoto || "");
  const [displayName, setDisplayName] = useState(teacherName);
  const [profileInitials, setProfileInitials] = useState(defaultProfileInitials);
  const [photoFailed, setPhotoFailed] = useState(false);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    const loadProfilePhoto = async () => {
      if (role === "teacher" && teacherUser) {
        setProfilePhoto(teacherPhoto);
        setDisplayName(teacherName);
        setProfileInitials(getUserInitials(teacherUser) || defaultProfileInitials);
        setPhotoFailed(false);
        return;
      }
      if (role === "teacher" && teacherSession?.loading) return;

      try {
        const session = getAuthSession();
        const userId = getCurrentUserId() ?? session?.user?.id ?? session?.user?.user_system_id;
        if (userId == null) {
          setProfilePhoto("");
          setDisplayName("");
          setProfileInitials(defaultProfileInitials);
          return;
        }

        const response = await api.get(`/user-systems/${userId}`, { signal: controller.signal });
        const user = getUserFromResponse(response.data);
        if (!user || typeof user !== "object" || Array.isArray(user)) {
          throw new Error("El servidor devolvió una respuesta inesperada al consultar la foto de perfil.");
        }
        if (active) {
          setProfilePhoto(user.photo_url || "");
          setDisplayName(getFirstAndLastName(user));
          setProfileInitials(getUserInitials(user) || defaultProfileInitials);
          setPhotoFailed(false);
        }
      } catch (error) {
        if (!active || controller.signal.aborted) return;
        console.error("No se pudo cargar la foto de perfil del encabezado:", error);
        setProfilePhoto("");
      }
    };

    loadProfilePhoto();
    return () => {
      active = false;
      controller.abort();
    };
  }, [defaultProfileInitials, role, teacherName, teacherPhoto, teacherSession?.loading, teacherUser]);

  return (
    <header className="ml-64 flex min-h-[76px] items-center justify-end border-b border-slate-200 bg-[#f1f5f9] px-8 max-sm:ml-[72px] max-sm:px-4">
      {displayName && (
        <span className="mr-3 text-sm font-medium text-slate-700">
          {displayName}
        </span>
      )}
      <Link
        to={profilePath}
        aria-label={`Ver perfil de ${title}`}
        className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#111629] text-xs font-semibold text-white no-underline ring-2 ring-white shadow-sm"
      >
        {profilePhoto && !photoFailed ? (
          <img
            src={profilePhoto}
            alt=""
            className="h-full w-full object-cover"
            onError={() => setPhotoFailed(true)}
          />
        ) : profileInitials}
      </Link>
    </header>
  );
};

export default Header;
