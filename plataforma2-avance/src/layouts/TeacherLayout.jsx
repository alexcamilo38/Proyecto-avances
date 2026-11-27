import { useEffect, useState } from "react";
import Aside from "./Aside";
import Header from "./Header";
import Main from "./Main";
import api from "../Config/env";
import { getAuthSession } from "../Config/auth";
import TeacherSessionContext from "../Config/TeacherSessionContext";

const getTeacherFromResponse = (responseData) => (
  responseData?.teacher
  || responseData?.data?.teacher
  || responseData?.data?.data
  || responseData?.data
  || responseData
);

const getUserFromResponse = (responseData) => {
  const user = responseData?.user_system
    || responseData?.user
    || responseData?.data?.user_system
    || responseData?.data?.user
    || responseData?.data?.data
    || responseData?.data
    || responseData;

  if (!user || typeof user !== "object" || Array.isArray(user)) {
    throw new Error("El servidor devolvió una respuesta inesperada al consultar la cuenta docente.");
  }
  return user;
};

const getInstitutions = (responseData) => {
  if (Array.isArray(responseData)) return responseData;
  if (Array.isArray(responseData?.data)) return responseData.data;
  if (Array.isArray(responseData?.institutions)) return responseData.institutions;
  if (Array.isArray(responseData?.data?.institutions)) return responseData.data.institutions;
  if (Array.isArray(responseData?.data?.data)) return responseData.data.data;

  throw new Error("El servidor devolvió una respuesta inesperada al consultar las instituciones.");
};

// Envuelve las vistas del docente con navegación y estructura de panel.
const TeacherLayout = () => {
  const [authSession, setAuthSession] = useState(() => getAuthSession());
  const [profile, setProfile] = useState(null);
  const [profileToken, setProfileToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const sessionToken = authSession?.token;
  const sessionUserId = authSession?.user?.id;
  const sessionKey = sessionToken
    ? `${sessionToken}:${sessionUserId ?? ""}`
    : null;

  useEffect(() => {
    const refreshSession = () => {
      try {
        setAuthSession(getAuthSession());
      } catch (sessionError) {
        console.error("No se pudo leer la sesión del docente:", sessionError);
        setAuthSession(null);
        setError("No se pudo leer la sesión. Cierra sesión e inicia nuevamente.");
      }
    };

    window.addEventListener("storage", refreshSession);
    return () => window.removeEventListener("storage", refreshSession);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    if (!sessionToken) {
      Promise.resolve().then(() => {
        if (!active) return;
        setProfile(null);
        setProfileToken(null);
        setLoading(false);
        setError("No hay una sesión activa. Inicia sesión para consultar el perfil docente.");
      });
      return () => {
        active = false;
        controller.abort();
      };
    }

    api.get("/teacher/profile", { signal: controller.signal })
      .then(async (response) => {
        const teacherProfile = getTeacherFromResponse(response.data);
        if (!teacherProfile) {
          throw new Error("El servidor no devolvió el perfil del docente autenticado.");
        }
        const profileUser = teacherProfile.user
          || teacherProfile.user_system
          || teacherProfile.userSystem
          || {};
        const userId = profileUser.id
          ?? teacherProfile.user_system_id
          ?? teacherProfile.userSystem?.id
          ?? teacherProfile.user_id
          ?? sessionUserId;
        if (userId == null) {
          throw new Error("El perfil docente no contiene el identificador de su cuenta.");
        }

        const userResponse = await api.get(`/user-systems/${userId}`, { signal: controller.signal });
        const user = { ...profileUser, ...getUserFromResponse(userResponse.data) };
        let institution = user.institution || teacherProfile.institution || null;
        const institutionId = user.institution_id ?? institution?.id ?? teacherProfile.institution_id;

        if ((!institution?.name_institution && !institution?.name) && institutionId != null) {
          const institutionsResponse = await api.get("/institutions/list", { signal: controller.signal });
          institution = getInstitutions(institutionsResponse.data).find(
            (item) => String(item.id) === String(institutionId),
          ) || institution;
        }

        const loadedProfile = { ...teacherProfile, user, institution };
        if (active) {
          setProfile(loadedProfile);
          setProfileToken(sessionKey);
          setError("");
          setLoading(false);
        }
      })
      .catch((requestError) => {
        if (!active || controller.signal.aborted) return;
        console.error("Error al cargar el perfil docente:", requestError);
        setProfile(null);
        setProfileToken(sessionKey);
        setLoading(false);
        setError(
          requestError.response?.data?.message
          || requestError.message
          || "No se pudo cargar el perfil docente.",
        );
      })

    return () => {
      active = false;
      controller.abort();
    };
  }, [sessionKey, sessionToken, sessionUserId]);

  const profileBelongsToSession = profileToken === sessionKey;

  return (
    <TeacherSessionContext.Provider value={{
      profile: profileBelongsToSession ? profile : null,
      loading: loading || (Boolean(sessionKey) && !profileBelongsToSession),
      error: profileBelongsToSession ? error : "",
      updateUser: (updatedUser) => setProfile((currentProfile) => (
        currentProfile ? { ...currentProfile, user: { ...currentProfile.user, ...updatedUser } } : currentProfile
      )),
    }}>
      <div className="min-h-screen bg-slate-100">
        <Aside role="teacher" />
        <Header role="teacher" />
        <Main />
      </div>
    </TeacherSessionContext.Provider>
  );
};

export default TeacherLayout;
