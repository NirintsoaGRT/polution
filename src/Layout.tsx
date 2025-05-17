import React from 'react';
import NavBar from './lib/Essentiell/NavBar';
import Sidebar from './lib/Essentiell/Sidebar';
import { useLocation } from 'react-router-dom';
import { useTheme } from './ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const{darkMode}=useTheme()
  const location = useLocation();
  const excludedRoutes = ['/Help', '/LogOut'];

  const isExcluded = excludedRoutes.includes(location.pathname);

  return (
    <div className={`flex h-screen ${darkMode ? 'bg-stone-50 text-black' : 'bg-slate-900 text-white' }`}>
      {!isExcluded && <Sidebar  />}
      <div className={`flex flex-col gap-4 ${isExcluded ? 'w-full' : 'ml-4'}`}>
        {!isExcluded && (
          <div className={`flex mt-3 pl-[15vw] ${darkMode ? 'bg-stone-50 text-black' : 'bg-slate-900 text-white' }`}>
            <NavBar />
          </div>
        )}
        <main className={` w-full pl-[13vw] pt-4 overflow-auto ${darkMode ? 'bg-stone-50 text-black' : 'bg-slate-900 text-white' }`}>{children}</main>
      </div>
    </div>
  );
}

export default Layout;
