import Aside from "./Aside";
import Header from "./Header";
import Main from "./Main";

const TeacherLayout = () => (
  <div className="min-h-screen bg-slate-100">
    <Aside role="teacher" />
    <Header role="teacher" />
    <Main />
  </div>
);

export default TeacherLayout;
