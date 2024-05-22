import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useStateContext } from "./context/contextProvider";
import SideBar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import UsageAnalysis from './pages/UsageAnalysis';
import ReturnBike from './pages/ReturnBike';
import RentBike from './pages/RentBike';
import DayReport from './pages/DayReport';
import SearchStation from './pages/SearchStation';
import Home from "./pages/Home";


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
      <div
        className={`bg-main-bg min-h-screen w-full ${
          activeMenu ? "md:ml-72" : "flex-2"
        }`}
      >
        <div className="fixed md:static navbar w-full">
          <Navbar />
        </div>

        <Routes>
          <Route index path="/" element={<Home />} />

          {/* introduction */}
          <Route path="/rent" element={<RentBike />} />
          <Route path="/return" element={<ReturnBike />} />
          <Route path="/search/station" element={<SearchStation />} />

          {/* analysis */}
          <Route path="/monthly/usage" element={<UsageAnalysis />} />
          <Route path="/day/report" element={<DayReport />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
