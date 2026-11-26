import { useEffect, useState } from "react";
import Aside from "./Aside";
import Header from "./Header";
import Main from "./Main";
import api from "../Config/env";
import { getAuthSession } from "../Config/auth";
import TeacherSessionContext from "../Config/TeacherSessionContext";

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
      .then((response) => {
        const teacherProfile = response.data?.teacher;
        if (!teacherProfile) {
          throw new Error("El servidor no devolvió el perfil del docente autenticado.");
        }
        if (active) {
          setProfile(teacherProfile);
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
  }, [sessionKey, sessionToken]);

  const profileBelongsToSession = profileToken === sessionKey;

  return (
    <TeacherSessionContext.Provider value={{
      profile: profileBelongsToSession ? profile : null,
      loading: loading || (Boolean(sessionKey) && !profileBelongsToSession),
      error: profileBelongsToSession ? error : "",
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
