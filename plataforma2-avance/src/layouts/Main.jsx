import { Outlet } from "react-router-dom";

const Main = () => (
  <main className="min-h-[calc(100vh-76px)]">
    <Outlet />
  </main>
);

export default Main;
