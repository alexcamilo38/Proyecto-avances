import Aside from "./Aside";
import Header from "./Header";
import Main from "./Main";

// Envuelve las vistas del estudiante con navegación y estructura de panel.
const StudentLayout = () => (
  <div className="min-h-screen bg-slate-100">
    <Aside role="student" />
    <Header role="student" />
    <Main />
  </div>
);

export default StudentLayout;
