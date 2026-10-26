import Aside from "./Aside";
import Header from "./Header";
import Main from "./Main";

const AdminLayout = () => (
  <div className="min-h-screen bg-slate-100">
    <Aside role="admin" />
    <Header role="admin" />
    <Main />
  </div>
);

export default AdminLayout;
