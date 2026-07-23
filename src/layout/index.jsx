import { Outlet } from "react-router-dom";

import Menu from "../components/Menu";
import MenuUsuario from "../components/MenuUsuario";

const Layout = () => {

    return (
        <div>
            <div><MenuUsuario /></div>
            <div><Outlet /></div>
            <div>©2026</div>
        </div>
    );
}
export default Layout;