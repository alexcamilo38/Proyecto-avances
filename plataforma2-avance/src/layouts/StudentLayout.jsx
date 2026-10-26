import Aside from "./Aside";
import Header from "./Header";
import Main from "./Main";

const StudentLayout = () => (
  <div className="min-h-screen bg-slate-100">
    <Aside role="student" />
    <Header role="student" />
    <Main />
  </div>
);

export default StudentLayout;
