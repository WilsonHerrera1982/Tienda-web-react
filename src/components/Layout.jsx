import { Outlet } from 'react-router-dom';

import Navbar from "./Navbar";

const Layout = () => {
   return (
      <div>
         <h1>Bienvenido a la Tienda-App</h1>
         <Navbar />
         <Outlet />
      </div>
   );
}

export default Layout;
