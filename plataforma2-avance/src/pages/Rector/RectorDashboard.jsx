import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../Config/env";
import { getAuthSession } from "../../Config/auth";
import { getApiErrorMessage, getCollection, getCurrentUserId } from "../Auth/authUtils";

const emptyDashboard = {
  institution: null,
  pending: null,
  approved: null,
  rejected: null,
  grades: null,
};

const getUserFromResponse = (responseData) => {
  const user = responseData?.user_system
    || responseData?.data?.user_system
    || responseData?.data?.data
    || responseData?.data
    || responseData;

  if (!user || typeof user !== "object" || Array.isArray(user)) {
    throw new Error("El servidor devolvió una respuesta inesperada al consultar el usuario.");
  }
  return user;
};

const getInstitutionId = (record) => record?.institution_id ?? record?.institution?.id;

const normalizeEnrollmentStatus = (status) => {
  const value = String(status || "").trim().toLowerCase();
  if (["aprobado", "aprobada", "approved", "aceptado", "aceptada"].includes(value)) return "Aprobada";
  if (["rechazado", "rechazada", "rejected"].includes(value)) return "Rechazada";
  if (["en_revision", "en revisión", "revision", "revisión", "review", "in_review"].includes(value)) return "En revisión";
  return "Pendiente";
};

const getInstitutionName = (institution) => (
  institution?.name_institution || institution?.name || ""
);

const RectorDashboard = () => {
  const [data, setData] = useState(emptyDashboard);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let ignore = false;

    const loadDashboard = async () => {
      setLoading(true);
      setError("");
      setWarning("");

      try {
        const session = getAuthSession();
        const userId = getCurrentUserId() ?? session?.user?.id ?? session?.user?.user_system_id;
        if (userId == null) {
          throw new Error("No se encontró la sesión del rector. Cierra sesión e inicia nuevamente.");
        }

        const userResponse = await api.get(`/user-systems/${userId}`);
        const user = getUserFromResponse(userResponse.data);
        const institutionId = user.institution_id ?? user.institution?.id;
        const [institutionsResult, enrollmentsResult, gradesResult] = await Promise.allSettled([
          api.get("/institutions/list"),
          api.get("/enrollments/list"),
          api.get("/grade-levels/list"),
        ]);
        const warnings = [];
        let institutions = null;
        let enrollments = null;
        let grades = null;

        [
          { result: institutionsResult, key: "institutions", label: "instituciones", assign: (value) => { institutions = value; } },
          { result: enrollmentsResult, key: "enrollments", label: "matrículas", assign: (value) => { enrollments = value; } },
          { result: gradesResult, key: "grade_levels", label: "grados", assign: (value) => { grades = value; } },
        ].forEach(({ result, key, label, assign }) => {
          if (result.status === "rejected") {
            console.error(`Error al consultar ${label}:`, result.reason);
            warnings.push(`No se pudieron consultar ${label}.`);
            return;
          }

          try {
            assign(getCollection(result.value.data, key));
          } catch (parseError) {
            console.error(`Error al leer ${label}:`, parseError);
            warnings.push(`No se pudieron leer ${label}.`);
          }
        });

        const institution = institutions?.find((item) => String(item.id) === String(institutionId))
          || user.institution
          || null;
        const institutionEnrollments = enrollments == null
          ? null
          : institutionId == null
            ? []
            : enrollments.filter((item) => String(getInstitutionId(item)) === String(institutionId));
        const institutionGrades = grades == null
          ? null
          : institutionId == null
            ? []
            : grades.filter((item) => String(getInstitutionId(item)) === String(institutionId));
        const statuses = institutionEnrollments?.map((item) => normalizeEnrollmentStatus(item.status)) || [];
        const nextData = {
          institution,
          pending: institutionEnrollments == null
            ? null
            : statuses.filter((status) => ["Pendiente", "En revisión"].includes(status)).length,
          approved: institutionEnrollments == null
            ? null
            : statuses.filter((status) => status === "Aprobada").length,
          rejected: institutionEnrollments == null
            ? null
            : statuses.filter((status) => status === "Rechazada").length,
          grades: institutionGrades?.length ?? null,
        };

        if (!ignore) {
          setData(nextData);
          setWarning(warnings.join(" "));
        }
      } catch (loadError) {
        console.error("Error al cargar el dashboard del rector:", loadError);
        if (!ignore) {
          setData(emptyDashboard);
          setError(getApiErrorMessage(loadError, "No se pudo cargar el dashboard."));
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    loadDashboard();
    return () => {
      ignore = true;
    };
  }, [reloadKey]);

  const metrics = [
    { label: "Matrículas por gestionar", value: data.pending, icon: "bi-hourglass-split", tone: "bg-amber-50 text-amber-700" },
    { label: "Matrículas aprobadas", value: data.approved, icon: "bi-person-check", tone: "bg-emerald-50 text-emerald-700" },
    { label: "Solicitudes rechazadas", value: data.rejected, icon: "bi-person-x", tone: "bg-red-50 text-red-700" },
    { label: "Grados registrados", value: data.grades, icon: "bi-journal-bookmark", tone: "bg-violet-50 text-violet-700" },
  ];
  const hasInstitution = Boolean(getInstitutionName(data.institution));

  return (
    <div className="ml-64 space-y-6 p-7 max-sm:ml-[72px] max-sm:p-4">
      {error && (
        <div role="alert" className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <span>{error}</span>
          <button type="button" onClick={() => setReloadKey((key) => key + 1)} className="font-semibold underline">Reintentar</button>
        </div>
      )}
      {warning && <p role="status" className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">{warning}</p>}
      {loading && <p role="status" className="m-0 rounded-xl bg-white p-4 text-sm text-slate-500 shadow-sm">Cargando datos del dashboard...</p>}

      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-violet-800 via-violet-900 to-indigo-950 px-6 py-7 text-white shadow-lg shadow-violet-950/10 sm:px-9 sm:py-9">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-violet-100">
              <i className="bi bi-building-fill-check" aria-hidden="true" />
              Portal del rector
            </span>
            <h1 className="mb-0 mt-4 text-2xl font-bold sm:text-3xl">
              {hasInstitution ? `Bienvenido, ${getInstitutionName(data.institution)}` : "Gestiona tu institución educativa"}
            </h1>
            <p className="mb-0 mt-2 text-sm leading-6 text-violet-100">
              Administra postulaciones, estudiantes matriculados y oferta académica desde un solo lugar.
            </p>
            {!hasInstitution && !loading && (
              <Link to="/RegistrarIns" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-violet-800 no-underline transition hover:bg-violet-50 focus:outline-none focus:ring-4 focus:ring-white/30">
                <i className="bi bi-building-add" aria-hidden="true" />
                Registrar institución
              </Link>
            )}
          </div>
          <span className="hidden h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-white/10 text-4xl text-violet-100 sm:flex">
            <i className="bi bi-mortarboard" aria-hidden="true" />
          </span>
        </div>
      </section>

      <section aria-label="Resumen de gestión" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <article key={metric.label} className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl ${metric.tone}`}>
              <i className={`bi ${metric.icon}`} aria-hidden="true" />
            </span>
            <div>
              <p className="m-0 text-xs text-slate-500">{metric.label}</p>
              <p className="m-0 mt-1 text-2xl font-bold text-slate-900">{loading ? "..." : metric.value ?? "—"}</p>
            </div>
          </article>
        ))}
      </section>

      <section>
        <div className="mb-4">
          <h2 className="m-0 text-xl font-bold text-slate-900">Accesos rápidos</h2>
          <p className="mb-0 mt-1 text-sm text-slate-500">Continúa con la gestión de tu comunidad educativa.</p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { to: "/RegistrarIns", title: hasInstitution ? "Ver institución" : "Registrar institución", description: "Consulta la información institucional.", icon: "bi-building", tone: "bg-violet-50 text-violet-700" },
            { to: "/RevisarMa", title: "Revisar matrículas", description: "Aprueba o rechaza postulaciones.", icon: "bi-clipboard-check", tone: "bg-amber-50 text-amber-700" },
            { to: "/EstudiantesAp", title: "Estudiantes", description: "Administra a los estudiantes aprobados.", icon: "bi-people", tone: "bg-emerald-50 text-emerald-700" },
            { to: "/CatalogoMa", title: "Catálogo académico", description: "Organiza grados, periodos y requisitos.", icon: "bi-journal-bookmark", tone: "bg-blue-50 text-blue-700" },
          ].map((item) => (
            <Link key={item.to} to={item.to} className="group rounded-2xl border border-slate-100 bg-white p-5 no-underline shadow-sm transition hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-violet-500/20">
              <span className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl text-lg ${item.tone}`}>
                <i className={`bi ${item.icon}`} aria-hidden="true" />
              </span>
              <h3 className="m-0 text-base font-semibold text-slate-900">{item.title}</h3>
              <p className="mb-0 mt-2 text-sm leading-5 text-slate-500">{item.description}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-violet-700">
                Abrir <i className="bi bi-arrow-right transition group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RectorDashboard;
