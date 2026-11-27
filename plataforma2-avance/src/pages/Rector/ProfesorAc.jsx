import { useEffect, useMemo, useState } from "react";
import api from "../../Config/env";
import { getAuthSession } from "../../Config/auth";
import { getApiErrorMessage, getCollection, getCurrentUserId } from "../Auth/authUtils";

const getUserFromResponse = (responseData) => {
  const user = responseData?.user_system
    || responseData?.user
    || responseData?.data?.user_system
    || responseData?.data?.user
    || responseData?.data?.data
    || responseData?.data
    || responseData;

  if (!user || typeof user !== "object" || Array.isArray(user)) {
    throw new Error("El servidor devolvió una respuesta inesperada al consultar el rector.");
  }
  return user;
};

const getTeacherUserId = (teacher) => (
  teacher.user_system_id
  ?? teacher.user_id
  ?? teacher.user_system?.id
  ?? teacher.userSystem?.id
  ?? teacher.user?.id
);

const getTeacherAccount = (teacher, usersById) => (
  usersById.get(String(getTeacherUserId(teacher)))
  || teacher.user_system
  || teacher.userSystem
  || teacher.user
  || null
);

const getAssociatedInstitutionId = (teacher, user) => {
  const hasAccountInstitution = user && (
    Object.prototype.hasOwnProperty.call(user, "institution_id")
    || Object.prototype.hasOwnProperty.call(user, "institution")
  );
  if (hasAccountInstitution) return user.institution_id ?? user.institution?.id ?? null;
  return teacher.institution_id ?? teacher.institution?.id ?? null;
};

const getTeacherName = (teacher, user) => [
  user?.first_name || teacher.first_name,
  user?.middle_name || teacher.middle_name,
  user?.last_name || teacher.last_name,
  user?.second_last_name || teacher.second_last_name,
].filter(Boolean).join(" ") || user?.username || `Profesor #${teacher.id}`;

const getInitials = (name) => name
  .split(/\s+/)
  .slice(0, 2)
  .map((part) => part.charAt(0))
  .join("")
  .toUpperCase();

const getAccountStatus = (status) => {
  if (status === true || status === 1 || ["1", "true", "active", "activo", "enabled", "habilitado"].includes(String(status).toLowerCase())) {
    return { label: "Activa", className: "bg-emerald-50 text-emerald-700" };
  }
  if (status === false || status === 0 || ["0", "false", "inactive", "inactivo", "disabled", "deshabilitado"].includes(String(status).toLowerCase())) {
    return { label: "Inactiva", className: "bg-slate-100 text-slate-600" };
  }
  return { label: "Sin estado", className: "bg-amber-50 text-amber-700" };
};

const isUserActive = (status) => (
  status === true
  || status === 1
  || ["1", "true", "active", "activo", "enabled", "habilitado"].includes(String(status).toLowerCase())
);

const getUnlinkPayload = (user) => {
  const roleId = user.rol_id ?? user.rol?.id ?? user.role?.id;

  return {
    first_name: user.first_name || "",
    middle_name: user.middle_name || null,
    last_name: user.last_name || "",
    second_last_name: user.second_last_name || null,
    document: user.document || "",
    document_type: user.document_type || null,
    phone: user.phone || null,
    email: user.email || "",
    username: user.username || "",
    status: isUserActive(user.status),
    institution_id: null,
    ...(roleId == null ? {} : { rol_id: Number(roleId) }),
    photo_url: user.photo_url || "",
    photo_public_id: user.photo_public_id || "",
  };
};

const ProfesorAc = () => {
  const [data, setData] = useState({
    institution: null,
    institutionId: null,
    teachers: [],
    users: [],
    warning: "",
  });
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [unlinkingId, setUnlinkingId] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [teacherToUnlink, setTeacherToUnlink] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let ignore = false;

    const loadTeachers = async () => {
      setLoading(true);
      setError("");
      setNotice("");

      try {
        const session = getAuthSession();
        const userId = getCurrentUserId() ?? session?.user?.id ?? session?.user?.user_system_id;
        if (userId == null) {
          throw new Error("No se encontró la sesión del rector. Cierra sesión e inicia nuevamente.");
        }

        const userResponse = await api.get(`/user-systems/${userId}`);
        const rector = getUserFromResponse(userResponse.data);
        const institutionId = rector.institution_id ?? rector.institution?.id;
        if (institutionId == null) {
          throw new Error("La cuenta del rector no tiene una institución asociada.");
        }

        const [teachersResult, usersResult, institutionsResult] = await Promise.allSettled([
          api.get("/teachers/list"),
          api.get("/user-systems/list"),
          api.get("/institutions/list"),
        ]);
        if (teachersResult.status === "rejected") throw teachersResult.reason;

        const teachers = getCollection(teachersResult.value.data, "teachers");
        const warnings = [];
        let users = [];
        let institutions = [];

        if (usersResult.status === "fulfilled") {
          try {
            users = getCollection(usersResult.value.data, "user_systems");
          } catch (parseError) {
            console.error("Error al leer las cuentas de docentes:", parseError);
            warnings.push("No se pudieron leer los datos completos de las cuentas docentes.");
          }
        } else {
          console.error("Error al cargar las cuentas docentes:", usersResult.reason);
          warnings.push("No se pudieron consultar todas las cuentas docentes.");
        }

        if (institutionsResult.status === "fulfilled") {
          try {
            institutions = getCollection(institutionsResult.value.data, "institutions");
          } catch (parseError) {
            console.error("Error al leer las instituciones:", parseError);
            warnings.push("No se pudo consultar el nombre de la institución.");
          }
        } else {
          console.error("Error al cargar las instituciones:", institutionsResult.reason);
          warnings.push("No se pudo consultar el nombre de la institución.");
        }

        const institution = institutions.find((item) => String(item.id) === String(institutionId))
          || rector.institution
          || { id: institutionId, name_institution: `Institución #${institutionId}` };

        if (!ignore) {
          setData({
            institution,
            institutionId,
            teachers,
            users,
            warning: warnings.join(" "),
          });
        }
      } catch (loadError) {
        console.error("Error al cargar los profesores de la institución:", loadError);
        if (!ignore) setError(getApiErrorMessage(loadError, "No se pudieron cargar los profesores asociados."));
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    loadTeachers();
    return () => {
      ignore = true;
    };
  }, [reloadKey]);

  const usersById = useMemo(
    () => new Map(data.users.map((user) => [String(user.id), user])),
    [data.users],
  );
  const associatedTeachers = useMemo(() => data.teachers
    .map((teacher) => ({ ...teacher, account: getTeacherAccount(teacher, usersById) }))
    .filter((teacher) => (
      String(getAssociatedInstitutionId(teacher, teacher.account)) === String(data.institutionId)
    )), [data.institutionId, data.teachers, usersById]);
  const filteredTeachers = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    if (!normalizedQuery) return associatedTeachers;

    return associatedTeachers.filter((teacher) => {
      const name = getTeacherName(teacher, teacher.account);
      return [
        name,
        teacher.account?.document,
        teacher.account?.email,
        teacher.account?.phone,
        teacher.specialty,
      ].some((value) => String(value || "").toLocaleLowerCase().includes(normalizedQuery));
    });
  }, [associatedTeachers, query]);

  const handleUnlink = async () => {
    const teacher = teacherToUnlink;
    const accountId = teacher?.account?.id ?? getTeacherUserId(teacher || {});
    if (!teacher || accountId == null) {
      setError("No se encontró la cuenta del profesor para desvincularlo.");
      setTeacherToUnlink(null);
      return;
    }

    setUnlinkingId(teacher.id);
    setError("");
    setNotice("");
    try {
      await api.put(`/user-systems/${accountId}`, getUnlinkPayload(teacher.account));
      setData((current) => ({
        ...current,
        teachers: current.teachers.filter((item) => String(item.id) !== String(teacher.id)),
      }));
      setNotice(`${getTeacherName(teacher, teacher.account)} fue desvinculado de la institución.`);
      setTeacherToUnlink(null);
    } catch (unlinkError) {
      console.error("Error al desvincular al profesor:", unlinkError);
      setError(getApiErrorMessage(unlinkError, "No se pudo desvincular al profesor de la institución."));
      setTeacherToUnlink(null);
    } finally {
      setUnlinkingId(null);
    }
  };

  const retryLoad = () => {
    setLoading(true);
    setError("");
    setNotice("");
    setReloadKey((current) => current + 1);
  };

  return (
    <div className="ml-64 min-h-[calc(100vh-76px)] w-[calc(100%-16rem)] px-7 py-8 max-sm:ml-[72px] max-sm:w-[calc(100%-72px)] max-sm:px-4 max-sm:py-5">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-violet-800">
              <i className="bi bi-person-video3" aria-hidden="true" />
              Comunidad educativa
            </span>
            <h1 className="m-0 text-3xl font-bold tracking-tight text-slate-900">Profesores asociados</h1>
            <p className="mb-0 mt-2 text-sm text-slate-500">
              Consulta y administra los profesores vinculados a {data.institution?.name_institution || "tu institución"}.
            </p>
          </div>
          <div className="rounded-2xl border border-violet-100 bg-white px-5 py-3 shadow-sm">
            <span className="block text-xs font-medium uppercase tracking-wide text-slate-400">Profesores</span>
            <strong className="mt-1 block text-2xl text-slate-900">{loading ? "..." : associatedTeachers.length}</strong>
          </div>
        </header>

        {error && (
          <div role="alert" className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
            <span className="flex flex-1 items-start gap-2">
              <i className="bi bi-exclamation-circle-fill mt-0.5 shrink-0" aria-hidden="true" />
              {error}
            </span>
            <button type="button" onClick={retryLoad} disabled={loading} className="shrink-0 font-semibold underline underline-offset-2 disabled:opacity-50">
              {loading ? "Cargando..." : "Reintentar"}
            </button>
          </div>
        )}
        {data.warning && (
          <p role="status" className="m-0 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">{data.warning}</p>
        )}
        {notice && (
          <p role="status" className="m-0 flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            <i className="bi bi-check-circle-fill" aria-hidden="true" />
            {notice}
          </p>
        )}

        <section className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-[0_12px_35px_rgba(15,23,42,0.06)]">
          <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <h2 className="m-0 text-lg font-semibold text-slate-900">Lista de profesores</h2>
              <p className="mb-0 mt-1 text-sm text-slate-500">Solo aparecen los profesores asociados a tu institución.</p>
            </div>
            <label className="relative block w-full sm:max-w-sm">
              <span className="sr-only">Buscar profesores</span>
              <i className="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar por nombre, documento o correo"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10"
              />
            </label>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] border-collapse text-left">
              <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-4">Profesor</th>
                  <th className="px-5 py-4">Documento</th>
                  <th className="px-5 py-4">Contacto</th>
                  <th className="px-5 py-4">Especialidad</th>
                  <th className="px-5 py-4">Estado</th>
                  <th className="px-5 py-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading && (
                  <tr>
                    <td colSpan="6" className="px-5 py-12 text-center text-sm text-slate-500">
                      Cargando profesores desde la API...
                    </td>
                  </tr>
                )}
                {!loading && filteredTeachers.map((teacher) => {
                  const name = getTeacherName(teacher, teacher.account);
                  const initials = getInitials(name);
                  const status = getAccountStatus(teacher.account?.status);
                  return (
                    <tr key={teacher.id} className="transition hover:bg-violet-50/40">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-xs font-bold text-violet-800">
                            {initials || <i className="bi bi-person-fill" aria-hidden="true" />}
                          </span>
                          <span>
                            <strong className="block text-sm font-semibold text-slate-800">{name}</strong>
                            <small className="text-xs text-slate-500">{teacher.account?.username || `Profesor #${teacher.id}`}</small>
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-600">
                        {teacher.account?.document || "No registrado"}
                        {teacher.account?.document_type && <span className="ml-1 text-xs text-slate-400">({teacher.account.document_type})</span>}
                      </td>
                      <td className="px-5 py-4">
                        <strong className="block text-sm font-medium text-slate-700">{teacher.account?.email || "Sin correo"}</strong>
                        <small className="text-xs text-slate-500">{teacher.account?.phone || "Sin teléfono"}</small>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-600">{teacher.specialty || "No especificada"}</td>
                      <td className="px-5 py-4">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${status.className}`}>{status.label}</span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedTeacher(teacher)}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-800"
                            aria-label={`Ver información de ${name}`}
                          >
                            <i className="bi bi-eye" aria-hidden="true" />
                            Ver
                          </button>
                          <button
                            type="button"
                            onClick={() => setTeacherToUnlink(teacher)}
                            disabled={!teacher.account?.id || unlinkingId !== null}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-50"
                            aria-label={`Desvincular a ${name}`}
                            title={teacher.account?.id ? "Desvincular profesor de la institución" : "No se encontró la cuenta de este profesor"}
                          >
                            <i className="bi bi-person-dash" aria-hidden="true" />
                            Desvincular
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {!loading && filteredTeachers.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-5 py-12 text-center">
                      <i className="bi bi-person-video3 mb-3 block text-3xl text-slate-300" aria-hidden="true" />
                      <span className="block text-sm font-semibold text-slate-700">
                        {associatedTeachers.length === 0 ? "Aún no hay profesores asociados" : "No se encontraron profesores"}
                      </span>
                      <span className="mt-1 block text-sm text-slate-500">
                        {associatedTeachers.length === 0
                          ? "Los profesores vinculados a tu institución aparecerán aquí."
                          : "Prueba con otro nombre, documento, correo o especialidad."}
                      </span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {selectedTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4" role="presentation">
          <section role="dialog" aria-modal="true" aria-labelledby="teacher-details-title" className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-wider text-violet-700">Perfil docente</p>
                <h2 id="teacher-details-title" className="m-0 text-xl font-bold text-slate-900">{getTeacherName(selectedTeacher, selectedTeacher.account)}</h2>
              </div>
              <button type="button" onClick={() => setSelectedTeacher(null)} className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition hover:bg-slate-200" aria-label="Cerrar detalles">
                <i className="bi bi-x-lg" aria-hidden="true" />
              </button>
            </div>
            <dl className="mb-0 mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                ["Documento", selectedTeacher.account?.document || "No registrado"],
                ["Tipo de documento", selectedTeacher.account?.document_type || "No registrado"],
                ["Correo", selectedTeacher.account?.email || "No registrado"],
                ["Teléfono", selectedTeacher.account?.phone || "No registrado"],
                ["Especialidad", selectedTeacher.specialty || "No especificada"],
                ["Institución", data.institution?.name_institution || "Institución asociada"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl bg-slate-50 p-3">
                  <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</dt>
                  <dd className="mb-0 mt-1 break-words text-sm font-semibold text-slate-800">{value}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      )}

      {teacherToUnlink && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4" role="presentation">
          <section role="dialog" aria-modal="true" aria-labelledby="unlink-teacher-title" className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-xl text-rose-600">
              <i className="bi bi-person-dash-fill" aria-hidden="true" />
            </span>
            <h2 id="unlink-teacher-title" className="mb-0 mt-4 text-xl font-bold text-slate-900">Desvincular profesor</h2>
            <p className="mb-0 mt-2 text-sm leading-6 text-slate-600">
              ¿Quieres quitar a <strong>{getTeacherName(teacherToUnlink, teacherToUnlink.account)}</strong> de esta institución? Su cuenta y sus datos se conservarán.
            </p>
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setTeacherToUnlink(null)}
                disabled={unlinkingId !== null}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleUnlink}
                disabled={unlinkingId !== null}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {unlinkingId !== null ? "Desvinculando..." : "Sí, desvincular"}
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default ProfesorAc;