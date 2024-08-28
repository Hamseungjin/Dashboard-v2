import { Link, NavLink } from 'react-router-dom';
import { links } from '../data/dummy';
import { useStateContext } from '../context/contextProvider';

const SideBar = () => {
  const { activeMenu, setActiveMenu, screenSize } = useStateContext();

  const activeLink = 'flex items-center gap-5 pl-7 pt-3 pb-2.5 rounded-lg text-white text-md m-2 bg-gradient-to-r from-green-500 to-blue-500 shadow-md';
  const notActiveLink = 'flex items-center gap-5 pl-7 pt-3 pb-2.5 rounded-lg text-md m-2 text-gray-700 hover:bg-gradient-to-r from-gray-300 to-gray-500 hover:text-white transition-all duration-300 ease-in-out';

  const handleCloseSidebar = () => {
    if (activeMenu && screenSize && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  return (
    <div className="h-screen w-64 bg-gray-800 overflow-auto z-50">
      {activeMenu && (
        <div className="ml-3 h-full pb-10">
          <div className="flex justify-between items-center">
            <Link to="/" onClick={handleCloseSidebar} className='flex items-end justify-start gap-2 ml-3 mt-8 text-xl tracking-tight text-[#056531]'>
              {/* 이미지 로고 사용 - 원형 스타일 적용 */}
              <img src="/images/logo.png" alt="따닷 로고" className="w-10 h-10 mb-1 object-cover rounded-full" />
              <span className='font-black font-point text-2xl pt-1'>따닷</span>
              <span className='text-lg font-semibold text-gray-500 tracking-tighter leading-[14px] font-point'>
                <p>Seoul</p>
                <p>Bike</p>
              </span>
            </Link>
          </div>

          {/* Menu List */}
          <div className='mt-14'>
            {links.map((item) => (
              <div key={item.title} className='mb-8 border-b border-slate-300 pb-4 last:border-none'>
                <p className='flex items-center gap-2 text-gray-400 m-3 font-semibold text-sm uppercase'>
                  <span className='text-xl'>{item.icon}</span>
                  <span>{item.title}</span>
                </p>
                {item.links.map((link) => (
                  <NavLink
                    to={`${link.linkTo}`}
                    key={link.name}
                    onClick={handleCloseSidebar}
                    className={({ isActive }) => isActive ? activeLink : notActiveLink}
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
