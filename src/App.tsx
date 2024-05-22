import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useStateContext } from "./context/contextProvider";
import SideBar from "./components/Sidebar";

const App = () => {
  const { activeMenu } = useStateContext();

  return (
    <BrowserRouter>
      {activeMenu ? (
        <div className="w-72 fixed sidebar bg-white">
          <SideBar />
        </div>
      ) : (
        <div className="w-0">
          <SideBar />
        </div>
      )}
    </BrowserRouter>
  );
};

export default App;
