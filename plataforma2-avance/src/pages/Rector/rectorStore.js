import { useCallback, useState } from "react";

const STORAGE_KEY = "easymatric.rector";

const initialData = {
  institution: null,
  applications: [
    { id: 1, user: "ana.rodriguez", name: "Ana Rodríguez", grade: "Preescolar", document: "documento-ana.pdf", submittedAt: "2026-04-27", status: "Pendiente", age: 5, gender: "Femenino" },
    { id: 2, user: "breiner.perez", name: "Breiner Pérez", grade: "6°", document: "documento-breiner.pdf", submittedAt: "2026-04-26", status: "Pendiente", age: 11, gender: "Masculino" },
    { id: 3, user: "valentina.ospina", name: "Valentina Ospina", grade: "8°", document: "documento-valentina.pdf", submittedAt: "2026-04-26", status: "Pendiente", age: 13, gender: "Femenino" },
    { id: 4, user: "carlos.mendoza", name: "Carlos Andrés Mendoza", grade: "3°", document: "documento-carlos.pdf", submittedAt: "2026-04-25", status: "Pendiente", age: 8, gender: "Masculino" },
    { id: 5, user: "angie.ortiz", name: "Angie Marcela Ortiz", grade: "Preescolar", document: "documento-angie.pdf", submittedAt: "2026-04-24", status: "Pendiente", age: 5, gender: "Femenino" },
  ],
  students: [],
  catalog: [],
};

const getInitialData = () => ({
  ...initialData,
  applications: initialData.applications.map((application) => ({ ...application })),
});

export const readRectorData = () => {
  const savedData = localStorage.getItem(STORAGE_KEY);
  return savedData ? { ...getInitialData(), ...JSON.parse(savedData) } : getInitialData();
};

export const updateRectorData = (update) => {
  const currentData = readRectorData();
  const nextData = update(currentData);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextData));
  return nextData;
};

export const useRectorData = () => {
  const [initialState] = useState(() => {
    try {
      return { data: readRectorData(), error: "" };
    } catch (storageError) {
      console.error("No se pudieron cargar los datos del rector.", storageError);
      return {
        data: getInitialData(),
        error: "No se pudieron cargar los datos guardados. Revisa el almacenamiento del navegador e inténtalo de nuevo.",
      };
    }
  });
  const [data, setData] = useState(initialState.data);
  const [error, setError] = useState(initialState.error);

  const updateData = useCallback((update) => {
    try {
      setData(updateRectorData(update));
      setError("");
      return true;
    } catch (storageError) {
      console.error("No se pudieron guardar los datos del rector.", storageError);
      const reason = storageError instanceof Error ? storageError.message : "Error desconocido";
      setError(`No se pudieron guardar los cambios: ${reason}`);
      return false;
    }
  }, []);

  return { data, error, updateData, setError };
};

export const schoolGrades = [
  "Preescolar",
  "1°",
  "2°",
  "3°",
  "4°",
  "5°",
  "6°",
  "7°",
  "8°",
  "9°",
  "10°",
  "11°",
];
