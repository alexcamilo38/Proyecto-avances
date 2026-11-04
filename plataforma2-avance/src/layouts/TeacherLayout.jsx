import Aside from "./Aside";
import Header from "./Header";
import Main from "./Main";

// Envuelve las vistas del docente con navegación y estructura de panel.
const TeacherLayout = () => (
  <div className="min-h-screen bg-slate-100">
    <Aside role="teacher" />
    <Header role="teacher" />
    <Main />
  </div>
);

export default TeacherLayout;
