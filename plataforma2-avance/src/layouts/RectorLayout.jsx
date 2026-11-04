import Aside from "./Aside";
import Header from "./Header";
import Main from "./Main";

// Envuelve las vistas del rector con navegación y estructura de panel.
const RectorLayout = () => (
  <div className="min-h-screen bg-slate-100">
    <Aside role="rector" />
    <Header role="rector" />
    <Main />
  </div>
);

export default RectorLayout;
