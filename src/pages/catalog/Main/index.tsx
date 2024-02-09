import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { useAdminAuthorized } from "admin/store";
import { useMerchantAuthorized } from "merchant/store";
import { localStorageService } from "services/localstorage-service";
import { ROUTE_PATHS } from "routes/routes.constant";

export default function Main(): JSX.Element {

  const navigate = useNavigate();
  const [ toggleMenu, setToggleMenu ] = useState(false);

  const location = useLocation();
  const currentPath = location.pathname;

  const [ authorizedAdmin ] = useAdminAuthorized();
  const [ authorizedMerchant ] = useMerchantAuthorized();

  const lsService = localStorageService();

  const logout = () => {
    lsService.clear();
    window.location.href = "/";
  }

  useEffect(() => {
    (async () => {
      try {
        const savedUser = lsService.getToken('user');
        if (!savedUser) {
          navigate(ROUTE_PATHS.LOGIN);
          return <></>
        }
      } catch (error) {
        throw new Error(`Erro ao carregar catálogos: ${error}`);
      }
      if (!authorizedAdmin || !authorizedMerchant) {
        logout();
      }
    })()
  }, []);
 
  return (
    <>
      <nav className="bg-gray-800">
        <div className="mx-auto px-2">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <div className="h-8 w-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="white"
                    className="w-12 h-full mx-auto"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <div className="flex space-x-4">
                  <Link className={" text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium" + (currentPath == ROUTE_PATHS.CATALOG ? ' bg-gray-900' : '')} 
                        to='catalog/main'>
                    Catálogo
                  </Link>
                  <Link className={" text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium" + (currentPath == ROUTE_PATHS.MERCHANT ? ' bg-gray-900' : '')}
                        to={ROUTE_PATHS.MERCHANT}>
                    Loja
                  </Link>
                </div>
              </div>
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="relative ml-3">
                <div>
                  <button
                    type="button"
                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={() => setToggleMenu(!toggleMenu)}
                  >
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://media.licdn.com/dms/image/D4D03AQGg9rS8YVMGgw/profile-displayphoto-shrink_800_800/0/1704566529197?e=1712188800&v=beta&t=w23akXOuvCmCRKudDSvQ9-Ms_VBNdAH5Fg7ElIuzZO0"
                      alt=""
                    />
                  </button>
                </div>
                { toggleMenu && (
                  <ul className="absolute cursor-pointer hover:bg-gray-100 right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button">
                    <li onClick={() => logout() } className="block px-4 py-2 text-sm text-gray-700" role="menuitem"  id="user-menu-item-2">Sair</li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
