import { useEffect } from "react";
import { useStateContext } from "../context/contextProvider";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Navbar = () => {
  const {activeMenu, setActiveMenu, screenSize, setScreenSize} = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  },[])

  useEffect(() => {
    if(screenSize && screenSize <= 900){
      setActiveMenu(false);
    }else{
      setActiveMenu(true)
    }
  },[screenSize])

  return (
    <div className="fixed text-2xl top-0 bg-white p-2.5">
      <button onClick={() => setActiveMenu((prev) => !prev)}>
        <span className="h-2 w-2 right-2 top-2 text-slate-700">
          {activeMenu ? <FaArrowLeft /> : <FaArrowRight />}
        </span>
      </button>
    </div>
  )
}

export default Navbar