import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import Input from "../components/Input";

import { useConnections } from "../hooks/useConnections";
import { crudService } from "../services/crudService";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const PassReset = () => {

    const navigate = useNavigate();

    const service = crudService("api/Users/change-password");
    const {
        loading,
        error,
        usePost
    } = useConnections(service);  

    const onSubmit = async (e) => {
        e.preventDefault(); 
        const formData = new FormData(e.target);
        const contraActual = formData.get("ca");
        const contraNueva = formData.get("nc");

        let result = await usePost({"appUserId": 1, "currentPassword": contraActual, "newPassword": contraNueva }); 
        navigate("/home"); // Redirige a la página de inicio después de iniciar sesión
    }

    return (
        <div style={{ padding: '20px'}}>
            <h1>Cambiar contraseña</h1>
            
            <p>Ingrese la nueva contraseña para actualizar su acceso.</p>  

            {error && 
                <Alert variant="danger">{error}</Alert>
            }

            <Form onSubmit={onSubmit} style={{ width: '50%', padding: "10px"}}>
                <Row style={{ paddingBottom: '3px'}}>
                    <Col sm={3}><Form.Label column={1} style={{ textAlign: 'right'}}>Contraseña Actual:</Form.Label></Col>
                    <Col sm={7}><Form.Control name="ca" type="password"></Form.Control></Col>
                </Row> 
                <Row style={{ paddingBottom: '3px'}}>
                    <Col sm={3}><Form.Label column={1} style={{ textAlign: 'right'}}>Nueva Contraseña:</Form.Label></Col>
                    <Col sm={7}><Form.Control name="nc" type="password"></Form.Control></Col>
                </Row> 
                <Row style={{ paddingBottom: '3px'}}>
                    <Col style={{ textAlign: 'center'}}><Button type="submit">Guardar</Button></Col>
                </Row>
            </Form>
            <Link to={'/'}>Volver al inicio</Link>
        </div>
    );
}
export default PassReset;