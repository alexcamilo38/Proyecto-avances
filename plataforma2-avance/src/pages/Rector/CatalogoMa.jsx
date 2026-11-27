import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../Config/env";

const emptyGradeForm = { name: "", cycle: "", sort_order: "" };
const emptyAcademicYearForm = { name: "", starts_on: "", ends_on: "", is_current: false };
const emptyClassGroupForm = {
  section: "",
  shift: "",
  capacity: "",
  campuse_id: "",
  grade_level_id: "",
  academic__year_id: "",
};
const emptyAcademicPeriodForm = {
  name: "",
  start_on: "",
  end_orden: "",
  sort_orden: "",
  academic_year_id: "",
};
const emptyRequirementTypeForm = {
  name: "",
  code: "",
  is_required: true,
  applies_to_cycle: "",
};

const compareGradeOrder = (first, second) => {
  const firstOrder = Number(first.sort_order);
  const secondOrder = Number(second.sort_order);

  if (Number.isFinite(firstOrder) && Number.isFinite(secondOrder)) return firstOrder - secondOrder;
  return String(first.sort_order).localeCompare(String(second.sort_order), undefined, { numeric: true });
};

const isCurrentYear = (value) => value === true || value === 1 || value === "1";
const isRequirementRequired = (value) => value === true || value === 1 || value === "1" || value === "true";

const getClassGroupReferences = (group) => [
  group.campuse_id ?? group.campus_id ?? group.campuse?.id ?? group.campus?.id,
  group.grade_level_id ?? group.gradeLevel?.id ?? group.grade_level?.id,
  group.academic__year_id
    ?? group.academic_year_id
    ?? group.academicYear?.id
    ?? group.academic_year?.id
    ?? group.academic__year?.id,
];

const filterClassGroupsByInstitution = (groups, campuses, grades, academicYears) => {
  const campusIds = new Set(campuses.map(({ id }) => String(id)));
  const gradeIds = new Set(grades.map(({ id }) => String(id)));
  const academicYearIds = new Set(academicYears.map(({ id }) => String(id)));

  return groups.filter((group) => {
    const [campusId, gradeId, academicYearId] = getClassGroupReferences(group);
    return (campusId !== null && campusId !== undefined && campusIds.has(String(campusId)))
      || (gradeId !== null && gradeId !== undefined && gradeIds.has(String(gradeId)))
      || (academicYearId !== null && academicYearId !== undefined && academicYearIds.has(String(academicYearId)));
  });
};

const getAcademicPeriodYearId = (period) => (
  period.academic_year_id
  ?? period.academicYear?.id
  ?? period.academic_year?.id
  ?? period.academic__year?.id
);

const filterAcademicPeriodsByYears = (periods, academicYears) => {
  const academicYearIds = new Set(academicYears.map(({ id }) => String(id)));
  return periods.filter((period) => {
    const academicYearId = getAcademicPeriodYearId(period);
    return academicYearId !== null
      && academicYearId !== undefined
      && academicYearIds.has(String(academicYearId));
  });
};

const getCollection = (responseData, key) => {
  if (Array.isArray(responseData)) return responseData;
  if (Array.isArray(responseData?.data)) return responseData.data;
  if (Array.isArray(responseData?.[key])) return responseData[key];
  if (Array.isArray(responseData?.data?.data)) return responseData.data.data;

  throw new Error(`El servidor devolvió una respuesta inesperada al consultar ${key}.`);
};

const getErrorMessage = (error, fallback) => {
  const validationErrors = error.response?.data?.errors;
  const firstValidationError = validationErrors && Object.values(validationErrors).flat()[0];

  return firstValidationError || error.response?.data?.message || error.message || fallback;
};

// Gestiona los catálogos académicos de la institución.
const CatalogoMa = () => {
  const [institution, setInstitution] = useState(null);
  const [gradeLevels, setGradeLevels] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);
  const [campuses, setCampuses] = useState([]);
  const [classGroups, setClassGroups] = useState([]);
  const [academicPeriods, setAcademicPeriods] = useState([]);
  const [requirementTypes, setRequirementTypes] = useState([]);
  const [loadingGrades, setLoadingGrades] = useState(true);
  const [loadingAcademicYears, setLoadingAcademicYears] = useState(true);
  const [loadingClassGroups, setLoadingClassGroups] = useState(true);
  const [loadingAcademicPeriods, setLoadingAcademicPeriods] = useState(true);
  const [loadingRequirementTypes, setLoadingRequirementTypes] = useState(true);
  const [gradeForm, setGradeForm] = useState(emptyGradeForm);
  const [academicYearForm, setAcademicYearForm] = useState(emptyAcademicYearForm);
  const [classGroupForm, setClassGroupForm] = useState(emptyClassGroupForm);
  const [academicPeriodForm, setAcademicPeriodForm] = useState(emptyAcademicPeriodForm);
  const [requirementTypeForm, setRequirementTypeForm] = useState(emptyRequirementTypeForm);
  const [editingGradeId, setEditingGradeId] = useState(null);
  const [editingAcademicYearId, setEditingAcademicYearId] = useState(null);
  const [editingClassGroupId, setEditingClassGroupId] = useState(null);
  const [editingAcademicPeriodId, setEditingAcademicPeriodId] = useState(null);
  const [editingRequirementTypeId, setEditingRequirementTypeId] = useState(null);
  const [savingGrade, setSavingGrade] = useState(false);
  const [savingAcademicYear, setSavingAcademicYear] = useState(false);
  const [savingClassGroup, setSavingClassGroup] = useState(false);
  const [savingAcademicPeriod, setSavingAcademicPeriod] = useState(false);
  const [savingRequirementType, setSavingRequirementType] = useState(false);
  const [deletingGradeId, setDeletingGradeId] = useState(null);
  const [deletingAcademicYearId, setDeletingAcademicYearId] = useState(null);
  const [deletingClassGroupId, setDeletingClassGroupId] = useState(null);
  const [deletingAcademicPeriodId, setDeletingAcademicPeriodId] = useState(null);
  const [deletingRequirementTypeId, setDeletingRequirementTypeId] = useState(null);
  const [apiError, setApiError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let ignore = false;

    const loadCatalogs = async () => {
      setLoadingGrades(true);
      setLoadingAcademicYears(true);
      setLoadingClassGroups(true);
      setLoadingAcademicPeriods(true);
      setLoadingRequirementTypes(true);
      setApiError("");

      const requests = [
        { key: "institutions", responseKey: "institutions", path: "/institutions/list" },
        { key: "gradeLevels", responseKey: "grade_levels", path: "/grade-levels/list" },
        { key: "academicYears", responseKey: "academic_years", path: "/academic-years/list" },
        { key: "campuses", responseKey: "campuses", path: "/campuses/list" },
        { key: "classGroups", responseKey: "class_groups", path: "/class-groups/list" },
        { key: "academicPeriods", responseKey: "academic_periods", path: "/academic-periods/list" },
        { key: "requirementTypes", responseKey: "requirement_types", path: "/requirement-types/list" },
      ];
      const results = await Promise.allSettled(requests.map(({ path }) => api.get(path)));
      const catalogs = {
        institutions: [],
        gradeLevels: [],
        academicYears: [],
        campuses: [],
        classGroups: [],
        academicPeriods: [],
        requirementTypes: [],
      };
      const errors = [];

      results.forEach((result, index) => {
        const { key, responseKey, path } = requests[index];
        if (result.status === "rejected") {
          console.error(`Error al consultar ${path}:`, result.reason);
          errors.push(getErrorMessage(result.reason, `No se pudo consultar ${path}.`));
          return;
        }

        try {
          catalogs[key] = getCollection(result.value.data, responseKey);
        } catch (parseError) {
          console.error(`Error al leer ${path}:`, parseError);
          errors.push(parseError.message);
        }
      });

      const currentInstitution = catalogs.institutions[0] || null;
      const belongsToInstitution = (item) => (
        String(item.institution_id ?? item.institution?.id) === String(currentInstitution?.id)
      );
      const institutionGrades = currentInstitution ? catalogs.gradeLevels.filter(belongsToInstitution) : [];
      const institutionAcademicYears = currentInstitution ? catalogs.academicYears.filter(belongsToInstitution) : [];
      const institutionCampuses = currentInstitution ? catalogs.campuses.filter(belongsToInstitution) : [];
      const institutionClassGroups = currentInstitution
        ? filterClassGroupsByInstitution(
          catalogs.classGroups,
          institutionCampuses,
          institutionGrades,
          institutionAcademicYears,
        )
        : [];
      const institutionAcademicPeriods = currentInstitution
        ? filterAcademicPeriodsByYears(catalogs.academicPeriods, institutionAcademicYears)
        : [];
      const institutionRequirementTypes = currentInstitution
        ? catalogs.requirementTypes.filter((item) => (
          String(item.institution_id ?? item.institution?.id) === String(currentInstitution.id)
        ))
        : [];

      if (!ignore) {
        setInstitution(currentInstitution);
        setGradeLevels(institutionGrades);
        setAcademicYears(institutionAcademicYears);
        setCampuses(institutionCampuses);
        setClassGroups(institutionClassGroups);
        setAcademicPeriods(institutionAcademicPeriods);
        setRequirementTypes(institutionRequirementTypes);
        setApiError(errors.join(" "));
        setLoadingGrades(false);
        setLoadingAcademicYears(false);
        setLoadingClassGroups(false);
        setLoadingAcademicPeriods(false);
        setLoadingRequirementTypes(false);
      }
    };

    loadCatalogs();
    return () => {
      ignore = true;
    };
  }, []);

  const handleGradeFormChange = (event) => {
    const { name, value } = event.target;
    setGradeForm((current) => ({ ...current, [name]: value }));
  };

  const resetGradeForm = () => {
    setGradeForm(emptyGradeForm);
    setEditingGradeId(null);
  };

  const saveGradeLevel = async (event) => {
    event.preventDefault();
    setApiError("");
    setNotice("");

    if (!institution?.id) {
      setApiError("Registra primero la institución para poder asociar los grados.");
      return;
    }

    setSavingGrade(true);
    const payload = { ...gradeForm, institution_id: institution.id };

    try {
      if (editingGradeId) {
        await api.put(`/grade-levels/${editingGradeId}`, payload);
      } else {
        await api.post("/grade-levels/store", payload);
      }

      const response = await api.get("/grade-levels/list");
      const allGradeLevels = getCollection(response.data, "grade_levels");
      setGradeLevels(allGradeLevels.filter((item) => (
        String(item.institution_id ?? item.institution?.id) === String(institution.id)
      )));
      setNotice(editingGradeId ? "El grado se actualizó correctamente." : "El grado se creó correctamente.");
      resetGradeForm();
    } catch (saveError) {
      console.error("Error al guardar el grado:", saveError);
      setApiError(getErrorMessage(saveError, "No se pudo guardar el grado."));
    } finally {
      setSavingGrade(false);
    }
  };

  const editGradeLevel = (item) => {
    setGradeForm({
      name: item.name || "",
      cycle: item.cycle || "",
      sort_order: item.sort_order ?? "",
    });
    setEditingGradeId(item.id);
    setApiError("");
    setNotice("");
  };

  const deleteGradeLevel = async (item) => {
    if (!window.confirm(`¿Eliminar el grado "${item.name}" de la base de datos?`)) return;

    setDeletingGradeId(item.id);
    setApiError("");
    setNotice("");

    try {
      await api.delete(`/grade-levels/${item.id}`);
      setGradeLevels((current) => current.filter(({ id }) => id !== item.id));
      if (editingGradeId === item.id) resetGradeForm();
      setNotice(`El grado ${item.name} se eliminó correctamente.`);
    } catch (deleteError) {
      console.error("Error al eliminar el grado:", deleteError);
      setApiError(getErrorMessage(deleteError, "No se pudo eliminar el grado."));
    } finally {
      setDeletingGradeId(null);
    }
  };

  const handleAcademicYearFormChange = (event) => {
    const { name, value, checked, type } = event.target;
    setAcademicYearForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  };

  const resetAcademicYearForm = () => {
    setAcademicYearForm(emptyAcademicYearForm);
    setEditingAcademicYearId(null);
  };

  const saveAcademicYear = async (event) => {
    event.preventDefault();
    setApiError("");
    setNotice("");

    if (!institution?.id) {
      setApiError("Registra primero la institución para poder asociar los años académicos.");
      return;
    }

    if (academicYearForm.ends_on < academicYearForm.starts_on) {
      setApiError("La fecha de finalización no puede ser anterior a la fecha de inicio.");
      return;
    }

    setSavingAcademicYear(true);
    const payload = { ...academicYearForm, institution_id: institution.id };

    try {
      if (editingAcademicYearId) {
        await api.put(`/academic-years/${editingAcademicYearId}`, payload);
      } else {
        await api.post("/academic-years/store", payload);
      }

      const response = await api.get("/academic-years/list");
      const allAcademicYears = getCollection(response.data, "academic_years");
      setAcademicYears(allAcademicYears.filter((item) => (
        String(item.institution_id ?? item.institution?.id) === String(institution.id)
      )));
      setNotice(editingAcademicYearId
        ? "El año académico se actualizó correctamente."
        : "El año académico se creó correctamente.");
      resetAcademicYearForm();
    } catch (saveError) {
      console.error("Error al guardar el año académico:", saveError);
      setApiError(getErrorMessage(saveError, "No se pudo guardar el año académico."));
    } finally {
      setSavingAcademicYear(false);
    }
  };

  const editAcademicYear = (item) => {
    setAcademicYearForm({
      name: item.name || "",
      starts_on: item.starts_on?.slice(0, 10) || "",
      ends_on: item.ends_on?.slice(0, 10) || "",
      is_current: isCurrentYear(item.is_current),
    });
    setEditingAcademicYearId(item.id);
    setApiError("");
    setNotice("");
  };

  const deleteAcademicYear = async (item) => {
    if (!window.confirm(`¿Eliminar el año académico "${item.name}" de la base de datos?`)) return;

    setDeletingAcademicYearId(item.id);
    setApiError("");
    setNotice("");

    try {
      await api.delete(`/academic-years/${item.id}`);
      setAcademicYears((current) => current.filter(({ id }) => id !== item.id));
      setAcademicPeriods((current) => current.filter((period) => (
        String(getAcademicPeriodYearId(period)) !== String(item.id)
      )));
      if (editingAcademicYearId === item.id) resetAcademicYearForm();
      setNotice(`El año académico ${item.name} se eliminó correctamente.`);
    } catch (deleteError) {
      console.error("Error al eliminar el año académico:", deleteError);
      setApiError(getErrorMessage(deleteError, "No se pudo eliminar el año académico."));
    } finally {
      setDeletingAcademicYearId(null);
    }
  };

  const handleClassGroupFormChange = (event) => {
    const { name, value } = event.target;
    setClassGroupForm((current) => ({ ...current, [name]: value }));
  };

  const resetClassGroupForm = () => {
    setClassGroupForm(emptyClassGroupForm);
    setEditingClassGroupId(null);
  };

  const saveClassGroup = async (event) => {
    event.preventDefault();
    setApiError("");
    setNotice("");

    if (!institution?.id) {
      setApiError("Registra primero la institución para poder asociar los grupos.");
      return;
    }

    if (!classGroupForm.section.trim()) {
      setApiError("Escribe el nombre de la sección.");
      return;
    }

    if (!classGroupForm.campuse_id && !classGroupForm.grade_level_id && !classGroupForm.academic__year_id) {
      setApiError("Asocia el grupo al menos con una sede, un grado o un año académico.");
      return;
    }

    const capacity = Number(classGroupForm.capacity);
    if (!Number.isInteger(capacity) || capacity < 1) {
      setApiError("La capacidad debe ser un número entero mayor que cero.");
      return;
    }

    setSavingClassGroup(true);
    const payload = {
      section: classGroupForm.section.trim(),
      shift: classGroupForm.shift,
      capacity,
      campuse_id: classGroupForm.campuse_id ? Number(classGroupForm.campuse_id) : null,
      grade_level_id: classGroupForm.grade_level_id ? Number(classGroupForm.grade_level_id) : null,
      academic__year_id: classGroupForm.academic__year_id ? Number(classGroupForm.academic__year_id) : null,
    };

    try {
      if (editingClassGroupId) {
        await api.put(`/class-groups/${editingClassGroupId}`, payload);
      } else {
        await api.post("/class-groups/store", payload);
      }

      const response = await api.get("/class-groups/list");
      const allClassGroups = getCollection(response.data, "class_groups");
      setClassGroups(filterClassGroupsByInstitution(allClassGroups, campuses, gradeLevels, academicYears));
      setNotice(editingClassGroupId
        ? "El grupo se actualizó correctamente."
        : "El grupo se creó correctamente.");
      resetClassGroupForm();
    } catch (saveError) {
      console.error("Error al guardar el grupo:", saveError);
      setApiError(getErrorMessage(saveError, "No se pudo guardar el grupo."));
    } finally {
      setSavingClassGroup(false);
    }
  };

  const editClassGroup = (group) => {
    setClassGroupForm({
      section: group.section || "",
      shift: group.shift || "",
      capacity: group.capacity ?? "",
      campuse_id: String(group.campuse_id ?? group.campus_id ?? group.campuse?.id ?? group.campus?.id ?? ""),
      grade_level_id: String(group.grade_level_id ?? group.gradeLevel?.id ?? group.grade_level?.id ?? ""),
      academic__year_id: String(
        group.academic__year_id
        ?? group.academic_year_id
        ?? group.academicYear?.id
        ?? group.academic_year?.id
        ?? group.academic__year?.id
        ?? "",
      ),
    });
    setEditingClassGroupId(group.id);
    setApiError("");
    setNotice("");
  };

  const deleteClassGroup = async (group) => {
    if (!window.confirm(`¿Eliminar el grupo ${group.section}?`)) return;

    setDeletingClassGroupId(group.id);
    setApiError("");
    setNotice("");

    try {
      await api.delete(`/class-groups/${group.id}`);
      setClassGroups((current) => current.filter(({ id }) => id !== group.id));
      if (editingClassGroupId === group.id) resetClassGroupForm();
      setNotice(`El grupo ${group.section} se eliminó correctamente.`);
    } catch (deleteError) {
      console.error("Error al eliminar el grupo:", deleteError);
      setApiError(getErrorMessage(deleteError, "No se pudo eliminar el grupo."));
    } finally {
      setDeletingClassGroupId(null);
    }
  };

  const handleAcademicPeriodFormChange = (event) => {
    const { name, value } = event.target;
    setAcademicPeriodForm((current) => ({ ...current, [name]: value }));
  };

  const resetAcademicPeriodForm = () => {
    setAcademicPeriodForm(emptyAcademicPeriodForm);
    setEditingAcademicPeriodId(null);
  };

  const saveAcademicPeriod = async (event) => {
    event.preventDefault();
    setApiError("");
    setNotice("");

    if (!academicPeriodForm.academic_year_id) {
      setApiError("Selecciona el año académico al que pertenece el periodo.");
      return;
    }

    if (academicPeriodForm.end_orden < academicPeriodForm.start_on) {
      setApiError("La fecha de finalización no puede ser anterior a la fecha de inicio.");
      return;
    }

    const sortOrder = Number(academicPeriodForm.sort_orden);
    if (!Number.isInteger(sortOrder) || sortOrder < 0) {
      setApiError("El orden debe ser un número entero igual o mayor que cero.");
      return;
    }

    setSavingAcademicPeriod(true);
    const payload = {
      name: academicPeriodForm.name.trim(),
      start_on: academicPeriodForm.start_on,
      end_orden: academicPeriodForm.end_orden,
      sort_orden: sortOrder,
      academic_year_id: Number(academicPeriodForm.academic_year_id),
    };

    try {
      if (editingAcademicPeriodId) {
        await api.put(`/academic-periods/${editingAcademicPeriodId}`, payload);
      } else {
        await api.post("/academic-periods/store", payload);
      }

      const response = await api.get("/academic-periods/list");
      const allAcademicPeriods = getCollection(response.data, "academic_periods");
      setAcademicPeriods(filterAcademicPeriodsByYears(allAcademicPeriods, academicYears));
      setNotice(editingAcademicPeriodId
        ? "El periodo académico se actualizó correctamente."
        : "El periodo académico se creó correctamente.");
      resetAcademicPeriodForm();
    } catch (saveError) {
      console.error("Error al guardar el periodo académico:", saveError);
      setApiError(getErrorMessage(saveError, "No se pudo guardar el periodo académico."));
    } finally {
      setSavingAcademicPeriod(false);
    }
  };

  const editAcademicPeriod = (period) => {
    setAcademicPeriodForm({
      name: period.name || "",
      start_on: period.start_on?.slice(0, 10) || "",
      end_orden: period.end_orden?.slice(0, 10) || "",
      sort_orden: period.sort_orden ?? "",
      academic_year_id: String(getAcademicPeriodYearId(period) ?? ""),
    });
    setEditingAcademicPeriodId(period.id);
    setApiError("");
    setNotice("");
  };

  const deleteAcademicPeriod = async (period) => {
    if (!window.confirm(`¿Eliminar el periodo académico "${period.name}"?`)) return;

    setDeletingAcademicPeriodId(period.id);
    setApiError("");
    setNotice("");

    try {
      await api.delete(`/academic-periods/${period.id}`);
      setAcademicPeriods((current) => current.filter(({ id }) => id !== period.id));
      if (editingAcademicPeriodId === period.id) resetAcademicPeriodForm();
      setNotice(`El periodo académico ${period.name} se eliminó correctamente.`);
    } catch (deleteError) {
      console.error("Error al eliminar el periodo académico:", deleteError);
      setApiError(getErrorMessage(deleteError, "No se pudo eliminar el periodo académico."));
    } finally {
      setDeletingAcademicPeriodId(null);
    }
  };

  const handleRequirementTypeFormChange = (event) => {
    const { name, value, checked, type } = event.target;
    setRequirementTypeForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetRequirementTypeForm = () => {
    setRequirementTypeForm(emptyRequirementTypeForm);
    setEditingRequirementTypeId(null);
  };

  const saveRequirementType = async (event) => {
    event.preventDefault();
    setApiError("");
    setNotice("");

    if (!institution?.id) {
      setApiError("Registra primero la institución para asociar los requisitos documentales.");
      return;
    }

    setSavingRequirementType(true);
    const payload = {
      name: requirementTypeForm.name.trim(),
      code: requirementTypeForm.code.trim(),
      is_required: Boolean(requirementTypeForm.is_required),
      applies_to_cycle: requirementTypeForm.applies_to_cycle.trim(),
      institution_id: Number(institution.id),
    };

    try {
      if (editingRequirementTypeId) {
        await api.put(`/requirement-types/${editingRequirementTypeId}`, payload);
      } else {
        await api.post("/requirement-types/store", payload);
      }

      const response = await api.get("/requirement-types/list");
      const allRequirementTypes = getCollection(response.data, "requirement_types");
      setRequirementTypes(allRequirementTypes.filter((item) => (
        String(item.institution_id ?? item.institution?.id) === String(institution.id)
      )));
      setNotice(editingRequirementTypeId
        ? "El requisito documental se actualizó correctamente."
        : "El requisito documental se creó correctamente.");
      resetRequirementTypeForm();
    } catch (saveError) {
      console.error("Error al guardar el requisito documental:", saveError);
      setApiError(getErrorMessage(saveError, "No se pudo guardar el requisito documental."));
    } finally {
      setSavingRequirementType(false);
    }
  };

  const editRequirementType = (item) => {
    setRequirementTypeForm({
      name: item.name || "",
      code: item.code || "",
      is_required: isRequirementRequired(item.is_required),
      applies_to_cycle: item.applies_to_cycle || "",
    });
    setEditingRequirementTypeId(item.id);
    setApiError("");
    setNotice("");
  };

  const deleteRequirementType = async (item) => {
    if (!window.confirm(`¿Eliminar el requisito "${item.name}"?`)) return;

    setDeletingRequirementTypeId(item.id);
    setApiError("");
    setNotice("");

    try {
      await api.delete(`/requirement-types/${item.id}`);
      setRequirementTypes((current) => current.filter(({ id }) => id !== item.id));
      if (editingRequirementTypeId === item.id) resetRequirementTypeForm();
      setNotice(`El requisito ${item.name} se eliminó correctamente.`);
    } catch (deleteError) {
      console.error("Error al eliminar el requisito documental:", deleteError);
      setApiError(getErrorMessage(deleteError, "No se pudo eliminar el requisito documental."));
    } finally {
      setDeletingRequirementTypeId(null);
    }
  };

  return (
    <div className="ml-64 min-h-[calc(100vh-76px)] w-[calc(100%-16rem)] px-7 py-8 max-sm:ml-[72px] max-sm:w-[calc(100%-72px)] max-sm:px-4 max-sm:py-5">
      <div className="mx-auto max-w-7xl space-y-6">
        <header>
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-violet-800">
            <i className="bi bi-journal-bookmark" aria-hidden="true" />
            Oferta educativa
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Catálogo académico</h1>
          <p className="mt-2 text-sm text-slate-500">Administra grados, años académicos, grupos y periodos de tu institución.</p>
        </header>

        {apiError && (
          <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{apiError}</div>
        )}
        {notice && (
          <div role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{notice}</div>
        )}
        {!loadingGrades && !institution && (
          <div className="flex flex-col gap-3 rounded-2xl border border-violet-200 bg-violet-50 p-4 text-sm text-violet-900 sm:flex-row sm:items-center sm:justify-between">
            <span>Registra primero la institución para asociar el catálogo académico.</span>
            <Link to="/RegistrarIns" className="font-bold text-violet-800 hover:text-violet-950">Registrar institución</Link>
          </div>
        )}

        <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.06)] sm:p-7">
          <div className="mb-5">
            <h2 className="m-0 text-lg font-semibold text-slate-900">Grados de la institución</h2>
            <p className="mb-0 mt-1 text-sm text-slate-500">Estos niveles se guardan en la base de datos y se asocian a tu institución.</p>
          </div>
          <form onSubmit={saveGradeLevel} className="grid grid-cols-1 items-end gap-4 md:grid-cols-[repeat(3,minmax(0,1fr))_auto]">
            <label className="text-sm font-semibold text-slate-700">
              Nombre del grado
              <input name="name" value={gradeForm.name} onChange={handleGradeFormChange} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10" placeholder="Ej. 1°" required />
            </label>
            <label className="text-sm font-semibold text-slate-700">
              Ciclo
              <input name="cycle" value={gradeForm.cycle} onChange={handleGradeFormChange} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10" placeholder="Ej. Primaria" required />
            </label>
            <label className="text-sm font-semibold text-slate-700">
              Orden
              <input name="sort_order" value={gradeForm.sort_order} onChange={handleGradeFormChange} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10" placeholder="Ej. 1" required />
            </label>
            <div className="flex gap-2">
              <button type="submit" disabled={savingGrade || !institution} className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-violet-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-50">
                <i className={`bi ${editingGradeId ? "bi-check-lg" : "bi-plus-lg"}`} aria-hidden="true" />
                {savingGrade ? "Guardando..." : editingGradeId ? "Actualizar" : "Crear grado"}
              </button>
              {editingGradeId && (
                <button type="button" onClick={resetGradeForm} className="min-h-[48px] rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancelar</button>
              )}
            </div>
          </form>

          <div className="mt-6 border-t border-slate-100 pt-5">
            {loadingGrades ? (
              <p role="status" className="mb-0 text-sm text-slate-500">Cargando grados...</p>
            ) : gradeLevels.length ? (
              <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2 xl:grid-cols-3">
                {[...gradeLevels].sort(compareGradeOrder).map((item) => (
                  <li key={item.id} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                    <div className="min-w-0">
                      <p className="m-0 truncate font-semibold text-slate-800">{item.name}</p>
                      <p className="mb-0 mt-1 text-xs text-slate-500">{item.cycle} · Orden {item.sort_order}</p>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <button type="button" onClick={() => editGradeLevel(item)} aria-label={`Editar ${item.name}`} className="rounded-lg p-2 text-slate-500 hover:bg-violet-100 hover:text-violet-700">
                        <i className="bi bi-pencil" aria-hidden="true" />
                      </button>
                      <button type="button" onClick={() => deleteGradeLevel(item)} disabled={deletingGradeId === item.id} aria-label={`Eliminar ${item.name}`} className="rounded-lg p-2 text-slate-500 hover:bg-red-100 hover:text-red-600 disabled:opacity-50">
                        <i className="bi bi-trash3" aria-hidden="true" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mb-0 text-sm text-slate-500">Todavía no hay grados registrados para esta institución.</p>
            )}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.06)] sm:p-7">
          <div className="mb-5">
            <h2 className="m-0 text-lg font-semibold text-slate-900">Años académicos</h2>
            <p className="mb-0 mt-1 text-sm text-slate-500">Administra los periodos lectivos de tu institución y marca el año vigente.</p>
          </div>
          <form onSubmit={saveAcademicYear} className="grid grid-cols-1 items-end gap-4 md:grid-cols-[repeat(3,minmax(0,1fr))_auto]">
            <label className="text-sm font-semibold text-slate-700">
              Nombre
              <input name="name" value={academicYearForm.name} onChange={handleAcademicYearFormChange} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10" placeholder="Ej. Año lectivo 2026" required />
            </label>
            <label className="text-sm font-semibold text-slate-700">
              Fecha de inicio
              <input type="date" name="starts_on" value={academicYearForm.starts_on} onChange={handleAcademicYearFormChange} max={academicYearForm.ends_on || undefined} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10" required />
            </label>
            <label className="text-sm font-semibold text-slate-700">
              Fecha de finalización
              <input type="date" name="ends_on" value={academicYearForm.ends_on} onChange={handleAcademicYearFormChange} min={academicYearForm.starts_on || undefined} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10" required />
            </label>
            <div className="flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <input type="checkbox" name="is_current" checked={academicYearForm.is_current} onChange={handleAcademicYearFormChange} className="h-4 w-4 accent-violet-700" />
                Año vigente
              </label>
              <button type="submit" disabled={savingAcademicYear || !institution} className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-violet-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-50">
                <i className={`bi ${editingAcademicYearId ? "bi-check-lg" : "bi-plus-lg"}`} aria-hidden="true" />
                {savingAcademicYear ? "Guardando..." : editingAcademicYearId ? "Actualizar" : "Crear año"}
              </button>
              {editingAcademicYearId && (
                <button type="button" onClick={resetAcademicYearForm} className="min-h-[48px] rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancelar</button>
              )}
            </div>
          </form>

          <div className="mt-6 border-t border-slate-100 pt-5">
            {loadingAcademicYears ? (
              <p role="status" className="mb-0 text-sm text-slate-500">Cargando años académicos...</p>
            ) : academicYears.length ? (
              <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2 xl:grid-cols-3">
                {[...academicYears]
                  .sort((a, b) => Number(isCurrentYear(b.is_current)) - Number(isCurrentYear(a.is_current))
                    || String(b.starts_on).localeCompare(String(a.starts_on)))
                  .map((item) => (
                    <li key={item.id} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                      <div className="min-w-0">
                        <p className="m-0 truncate font-semibold text-slate-800">
                          {item.name}
                          {isCurrentYear(item.is_current) && <span className="ml-2 rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-bold uppercase text-emerald-700">Vigente</span>}
                        </p>
                        <p className="mb-0 mt-1 text-xs text-slate-500">{item.starts_on} – {item.ends_on}</p>
                      </div>
                      <div className="flex shrink-0 gap-1">
                        <button type="button" onClick={() => editAcademicYear(item)} aria-label={`Editar ${item.name}`} className="rounded-lg p-2 text-slate-500 hover:bg-violet-100 hover:text-violet-700">
                          <i className="bi bi-pencil" aria-hidden="true" />
                        </button>
                        <button type="button" onClick={() => deleteAcademicYear(item)} disabled={deletingAcademicYearId === item.id} aria-label={`Eliminar ${item.name}`} className="rounded-lg p-2 text-slate-500 hover:bg-red-100 hover:text-red-600 disabled:opacity-50">
                          <i className="bi bi-trash3" aria-hidden="true" />
                        </button>
                      </div>
                    </li>
                  ))}
              </ul>
            ) : (
              <p className="mb-0 text-sm text-slate-500">Todavía no hay años académicos registrados para esta institución.</p>
            )}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.06)] sm:p-7">
          <div className="mb-5">
            <h2 className="m-0 text-lg font-semibold text-slate-900">Grupos de clase</h2>
            <p className="mb-0 mt-1 text-sm text-slate-500">Organiza secciones por sede, grado, año académico y jornada.</p>
            <p className="mb-0 mt-1 text-xs text-slate-400">La sede, el grado y el año son opcionales, pero debes asociar al menos uno para identificar el grupo con tu institución.</p>
          </div>
          <form onSubmit={saveClassGroup} className="grid grid-cols-1 items-end gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <label className="text-sm font-semibold text-slate-700">
              Sección
              <input name="section" value={classGroupForm.section} onChange={handleClassGroupFormChange} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10" placeholder="Ej. A" required />
            </label>
            <label className="text-sm font-semibold text-slate-700">
              Jornada
              <select name="shift" value={classGroupForm.shift} onChange={handleClassGroupFormChange} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10" required>
                <option value="" disabled>Selecciona una jornada</option>
                <option value="Mañana">Mañana</option>
                <option value="Tarde">Tarde</option>
                <option value="Única">Única</option>
              </select>
            </label>
            <label className="text-sm font-semibold text-slate-700">
              Capacidad
              <input type="number" name="capacity" min="1" step="1" value={classGroupForm.capacity} onChange={handleClassGroupFormChange} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10" placeholder="Ej. 30" required />
            </label>
            <label className="text-sm font-semibold text-slate-700">
              Sede
              <select name="campuse_id" value={classGroupForm.campuse_id} onChange={handleClassGroupFormChange} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10">
                <option value="">Sin sede</option>
                {campuses.map((campus) => <option key={campus.id} value={campus.id}>{campus.name || `Sede #${campus.id}`}</option>)}
              </select>
            </label>
            <label className="text-sm font-semibold text-slate-700">
              Grado
              <select name="grade_level_id" value={classGroupForm.grade_level_id} onChange={handleClassGroupFormChange} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10">
                <option value="">Sin grado</option>
                {gradeLevels.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
              </select>
            </label>
            <label className="text-sm font-semibold text-slate-700">
              Año académico
              <select name="academic__year_id" value={classGroupForm.academic__year_id} onChange={handleClassGroupFormChange} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10">
                <option value="">Sin año académico</option>
                {academicYears.map((item) => <option key={item.id} value={item.id}>{item.name}{isCurrentYear(item.is_current) ? " (Vigente)" : ""}</option>)}
              </select>
            </label>
            <div className="flex flex-wrap gap-2 sm:col-span-2 xl:col-span-3">
              <button type="submit" disabled={savingClassGroup || !institution} className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-violet-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-50">
                <i className={`bi ${editingClassGroupId ? "bi-check-lg" : "bi-plus-lg"}`} aria-hidden="true" />
                {savingClassGroup ? "Guardando..." : editingClassGroupId ? "Actualizar grupo" : "Crear grupo"}
              </button>
              {editingClassGroupId && (
                <button type="button" onClick={resetClassGroupForm} className="min-h-[48px] rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancelar</button>
              )}
            </div>
          </form>

          <div className="mt-6 border-t border-slate-100 pt-5">
            {loadingClassGroups ? (
              <p role="status" className="mb-0 text-sm text-slate-500">Cargando grupos de clase...</p>
            ) : classGroups.length ? (
              <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2 xl:grid-cols-3">
                {classGroups.map((group) => {
                  const campusId = group.campuse_id ?? group.campus_id ?? group.campuse?.id ?? group.campus?.id;
                  const gradeId = group.grade_level_id ?? group.gradeLevel?.id ?? group.grade_level?.id;
                  const academicYearId = group.academic__year_id
                    ?? group.academic_year_id
                    ?? group.academicYear?.id
                    ?? group.academic_year?.id
                    ?? group.academic__year?.id;
                  const campus = campuses.find((item) => String(item.id) === String(campusId)) || group.campuse || group.campus;
                  const gradeLevel = gradeLevels.find((item) => String(item.id) === String(gradeId)) || group.gradeLevel || group.grade_level;
                  const academicYear = academicYears.find((item) => String(item.id) === String(academicYearId))
                    || group.academicYear
                    || group.academic_year
                    || group.academic__year;

                  return (
                    <li key={group.id} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                      <div className="min-w-0">
                        <p className="m-0 truncate font-semibold text-slate-800">
                          Sección {group.section}
                          {group.shift && <span className="ml-2 text-xs font-medium text-violet-700">{group.shift}</span>}
                        </p>
                        <p className="mb-0 mt-1 truncate text-xs text-slate-500">
                          {[campus?.name || "Sin sede", gradeLevel?.name || "Sin grado", academicYear?.name || "Sin año académico"].join(" · ")}
                        </p>
                        <p className="mb-0 mt-1 text-xs text-slate-500">Capacidad: {group.capacity}</p>
                      </div>
                      <div className="flex shrink-0 gap-1">
                        <button type="button" onClick={() => editClassGroup(group)} aria-label={`Editar sección ${group.section}`} className="rounded-lg p-2 text-slate-500 hover:bg-violet-100 hover:text-violet-700">
                          <i className="bi bi-pencil" aria-hidden="true" />
                        </button>
                        <button type="button" onClick={() => deleteClassGroup(group)} disabled={deletingClassGroupId === group.id} aria-label={`Eliminar sección ${group.section}`} className="rounded-lg p-2 text-slate-500 hover:bg-red-100 hover:text-red-600 disabled:opacity-50">
                          <i className="bi bi-trash3" aria-hidden="true" />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="mb-0 text-sm text-slate-500">Todavía no hay grupos de clase registrados para esta institución.</p>
            )}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.06)] sm:p-7">
          <div className="mb-5">
            <h2 className="m-0 text-lg font-semibold text-slate-900">Periodos académicos</h2>
            <p className="mb-0 mt-1 text-sm text-slate-500">Define periodos dentro de los años académicos de tu institución y su orden.</p>
          </div>
          {!academicYears.length && !loadingAcademicYears && (
            <p className="mb-4 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">Registra primero un año académico para poder asociar periodos.</p>
          )}
          <form onSubmit={saveAcademicPeriod} className="grid grid-cols-1 items-end gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <label className="text-sm font-semibold text-slate-700">
              Nombre del periodo
              <input name="name" value={academicPeriodForm.name} onChange={handleAcademicPeriodFormChange} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10" placeholder="Ej. Primer periodo" required />
            </label>
            <label className="text-sm font-semibold text-slate-700">
              Año académico
              <select name="academic_year_id" value={academicPeriodForm.academic_year_id} onChange={handleAcademicPeriodFormChange} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10" required>
                <option value="" disabled>Selecciona un año</option>
                {academicYears.map((year) => <option key={year.id} value={year.id}>{year.name}{isCurrentYear(year.is_current) ? " (Vigente)" : ""}</option>)}
              </select>
            </label>
            <label className="text-sm font-semibold text-slate-700">
              Fecha de inicio
              <input type="date" name="start_on" value={academicPeriodForm.start_on} onChange={handleAcademicPeriodFormChange} max={academicPeriodForm.end_orden || undefined} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10" required />
            </label>
            <label className="text-sm font-semibold text-slate-700">
              Fecha de finalización
              <input type="date" name="end_orden" value={academicPeriodForm.end_orden} onChange={handleAcademicPeriodFormChange} min={academicPeriodForm.start_on || undefined} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10" required />
            </label>
            <label className="text-sm font-semibold text-slate-700">
              Orden
              <input type="number" name="sort_orden" min="0" step="1" value={academicPeriodForm.sort_orden} onChange={handleAcademicPeriodFormChange} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10" placeholder="Ej. 1" required />
            </label>
            <div className="flex flex-wrap gap-2">
              <button type="submit" disabled={savingAcademicPeriod || !academicYears.length} className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-violet-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-50">
                <i className={`bi ${editingAcademicPeriodId ? "bi-check-lg" : "bi-plus-lg"}`} aria-hidden="true" />
                {savingAcademicPeriod ? "Guardando..." : editingAcademicPeriodId ? "Actualizar periodo" : "Crear periodo"}
              </button>
              {editingAcademicPeriodId && (
                <button type="button" onClick={resetAcademicPeriodForm} className="min-h-[48px] rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancelar</button>
              )}
            </div>
          </form>

          <div className="mt-6 border-t border-slate-100 pt-5">
            {loadingAcademicPeriods ? (
              <p role="status" className="mb-0 text-sm text-slate-500">Cargando periodos académicos...</p>
            ) : academicPeriods.length ? (
              <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2 xl:grid-cols-3">
                {[...academicPeriods]
                  .sort((first, second) => Number(first.sort_orden) - Number(second.sort_orden))
                  .map((period) => {
                    const yearId = getAcademicPeriodYearId(period);
                    const academicYear = academicYears.find((year) => String(year.id) === String(yearId))
                      || period.academicYear
                      || period.academic_year;

                    return (
                      <li key={period.id} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                        <div className="min-w-0">
                          <p className="m-0 truncate font-semibold text-slate-800">{period.name}</p>
                          <p className="mb-0 mt-1 truncate text-xs text-violet-700">{academicYear?.name || "Año académico"}</p>
                          <p className="mb-0 mt-1 text-xs text-slate-500">{period.start_on} – {period.end_orden}</p>
                          <p className="mb-0 mt-1 text-xs text-slate-500">Orden {period.sort_orden}</p>
                        </div>
                        <div className="flex shrink-0 gap-1">
                          <button type="button" onClick={() => editAcademicPeriod(period)} aria-label={`Editar ${period.name}`} className="rounded-lg p-2 text-slate-500 hover:bg-violet-100 hover:text-violet-700">
                            <i className="bi bi-pencil" aria-hidden="true" />
                          </button>
                          <button type="button" onClick={() => deleteAcademicPeriod(period)} disabled={deletingAcademicPeriodId === period.id} aria-label={`Eliminar ${period.name}`} className="rounded-lg p-2 text-slate-500 hover:bg-red-100 hover:text-red-600 disabled:opacity-50">
                            <i className="bi bi-trash3" aria-hidden="true" />
                          </button>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            ) : (
              <p className="mb-0 text-sm text-slate-500">Todavía no hay periodos académicos registrados.</p>
            )}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.06)] sm:p-7">
          <div className="mb-5">
            <h2 className="m-0 text-lg font-semibold text-slate-900">Requisitos documentales</h2>
            <p className="mb-0 mt-1 text-sm text-slate-500">
              Configura los documentos solicitados durante la matrícula. El ciclo debe coincidir con el ciclo de los grados.
            </p>
          </div>
          <form onSubmit={saveRequirementType} className="grid grid-cols-1 items-end gap-4 sm:grid-cols-2 xl:grid-cols-5">
            <label className="text-sm font-semibold text-slate-700">
              Nombre del requisito
              <input
                name="name"
                value={requirementTypeForm.name}
                onChange={handleRequirementTypeFormChange}
                maxLength={255}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                placeholder="Ej. Documento de identidad"
                required
              />
            </label>
            <label className="text-sm font-semibold text-slate-700">
              Código
              <input
                name="code"
                value={requirementTypeForm.code}
                onChange={handleRequirementTypeFormChange}
                maxLength={255}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                placeholder="Ej. DOC_IDENTIDAD"
                required
              />
            </label>
            <label className="text-sm font-semibold text-slate-700">
              Aplica al ciclo
              <input
                name="applies_to_cycle"
                value={requirementTypeForm.applies_to_cycle}
                onChange={handleRequirementTypeFormChange}
                list="requirement-cycle-options"
                maxLength={255}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                placeholder="Ej. Primaria"
                required
              />
              <datalist id="requirement-cycle-options">
                {[...new Set(gradeLevels.map(({ cycle }) => cycle).filter(Boolean))]
                  .map((cycle) => <option key={cycle} value={cycle} />)}
                <option value="Todos los ciclos" />
              </datalist>
            </label>
            <label className="flex min-h-[48px] items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-semibold text-slate-700">
              <input
                type="checkbox"
                name="is_required"
                checked={requirementTypeForm.is_required}
                onChange={handleRequirementTypeFormChange}
                className="h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
              />
              Requisito obligatorio
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="submit"
                disabled={savingRequirementType || !institution?.id}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-violet-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <i className={`bi ${editingRequirementTypeId ? "bi-check-lg" : "bi-plus-lg"}`} aria-hidden="true" />
                {savingRequirementType
                  ? "Guardando..."
                  : editingRequirementTypeId
                    ? "Actualizar requisito"
                    : "Crear requisito"}
              </button>
              {editingRequirementTypeId && (
                <button
                  type="button"
                  onClick={resetRequirementTypeForm}
                  className="min-h-[48px] rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>

          <div className="mt-6 border-t border-slate-100 pt-5">
            {loadingRequirementTypes ? (
              <p role="status" className="mb-0 text-sm text-slate-500">Cargando requisitos documentales...</p>
            ) : requirementTypes.length ? (
              <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2 xl:grid-cols-3">
                {requirementTypes.map((requirement) => (
                  <li key={requirement.id} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                    <div className="min-w-0">
                      <p className="m-0 truncate font-semibold text-slate-800">{requirement.name}</p>
                      <p className="mb-0 mt-1 truncate text-xs text-violet-700">Código: {requirement.code}</p>
                      <p className="mb-0 mt-1 text-xs text-slate-500">Ciclo: {requirement.applies_to_cycle}</p>
                      <span className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${isRequirementRequired(requirement.is_required) ? "bg-rose-50 text-rose-700" : "bg-slate-200 text-slate-600"}`}>
                        {isRequirementRequired(requirement.is_required) ? "Obligatorio" : "Opcional"}
                      </span>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <button
                        type="button"
                        onClick={() => editRequirementType(requirement)}
                        aria-label={`Editar requisito ${requirement.name}`}
                        className="rounded-lg p-2 text-slate-500 hover:bg-violet-100 hover:text-violet-700"
                      >
                        <i className="bi bi-pencil" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteRequirementType(requirement)}
                        disabled={deletingRequirementTypeId === requirement.id}
                        aria-label={`Eliminar requisito ${requirement.name}`}
                        className="rounded-lg p-2 text-slate-500 hover:bg-red-100 hover:text-red-600 disabled:opacity-50"
                      >
                        <i className="bi bi-trash3" aria-hidden="true" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mb-0 text-sm text-slate-500">Todavía no hay requisitos documentales para esta institución.</p>
            )}
          </div>
        </section>

      </div>
    </div>
  );
};

export default CatalogoMa;