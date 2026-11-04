import { Outlet } from "react-router-dom";

// Proporciona el contenedor general para el contenido de una página.
const Main = () => (
  <main className="min-h-[calc(100vh-76px)]">
    <Outlet />
  </main>
);

export default Main;
