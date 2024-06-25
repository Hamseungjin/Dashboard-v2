import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useStateContext } from "./context/contextProvider";
import SideBar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { Suspense, lazy } from "react";
import LoadingPage from "./components/loading/LoadingPage";

// import Home from "./pages/Home"
// import RentBike from "./pages/RentBike";
// import ReturnBike from "./pages/ReturnBike";
// import SearchStation from "./pages/SearchStation";
// import MonthlyReport from "./pages/MonthlyReport"
// import DayReport from "./pages/DayReport"

// lazy page components
const Home = lazy(() => import("./pages/Home"))
const RentBike = lazy(() => import("./pages/RentBike"));
const ReturnBike = lazy(() => import("./pages/ReturnBike"));
const SearchStation = lazy(() => import("./pages/SearchStation"));
const MonthlyReport = lazy(() => import("./pages/MonthlyReport"))
const DayReport = lazy(() => import("./pages/DayReport"));

const App = () => {
  const { activeMenu } = useStateContext();

  return (
    <BrowserRouter>
      <div className="flex relative">
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
          <Suspense fallback={<LoadingPage />}>
            <Routes>
              <Route index path="/" element={<Home />} />

              {/* introduction */}
              <Route path="/rent" element={<RentBike />} />
              <Route path="/return" element={<ReturnBike />} />
              <Route path="/search/station" element={<SearchStation />} />

              {/* analysis */}
              <Route path="/monthly/usage" element={<MonthlyReport />} />
              <Route path="/day/report" element={<DayReport />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
