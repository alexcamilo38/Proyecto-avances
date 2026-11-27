import { createContext } from "react";

const TeacherSessionContext = createContext({
  profile: null,
  loading: true,
  error: "",
  updateUser: () => {},
});

export default TeacherSessionContext;
