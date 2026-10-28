import Aside from "./Aside";
import Header from "./Header";
import Main from "./Main";

const RectorLayout = () => (
  <div className="min-h-screen bg-slate-100">
    <Aside role="rector" />
    <Header role="rector" />
    <Main />
  </div>
);

export default RectorLayout;
