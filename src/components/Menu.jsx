import { Link } from "react-router-dom";

const Menu = () => {

    return (
        <div>
            <Link to="/applications">Aplicación</Link> | 
            &nbsp;<Link to="/companies">Compañía</Link> | 
            &nbsp;<Link to="/licenses">Licencia</Link> | 
            &nbsp;<Link to="/roles">Rol</Link> | 
            &nbsp;<Link to="/users">Usuarios</Link> |
            &nbsp;<Link to="/" 
                onClick={() => {
                    for (const key in localStorage) {
                        delete localStorage[key];
                    }
                }}
            >Salir</Link>
        </div>
    )
}
export default Menu;
