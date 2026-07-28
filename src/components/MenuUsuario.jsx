import { Link } from "react-router-dom";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const MenuUsuario = () => {

    return (
        <Row>
            {/* <Link to="/jobapplication">Seguimiento Empleos</Link> |  */}
            {/* &nbsp;<Link to="/jobappstatus">Estados</Link> | 
            &nbsp;<Link to="/notetypes">Tipos de Notas</Link> | */}
            <Col>
                <Link to="/" 
                    onClick={() => {
                        for (const key in localStorage) {
                            delete localStorage[key];
                        }
                    }}
                >Salir</Link>
            </Col>
        </Row>
    )
}
export default MenuUsuario;