import { Link } from "react-router-dom";

const MenuUsuario = () => {

    return (
        <div>
            <Link to="/jobapplication">Aplicación a Empleos</Link> | 
            &nbsp;<Link to="/jobappstatus">Estados</Link> | 
            &nbsp;<Link to="/notetypes">Tipos de Notas</Link> |
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
export default MenuUsuario;