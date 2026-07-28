import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import Input from "../components/Input";

import { useConnections } from "../hooks/useConnections";
import { crudService } from "../services/crudService";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const Login = () => {

    const navigate = useNavigate();

    const service = crudService("api/Auth/Login");
    const {
        loading,
        error,
        usePost
    } = useConnections(service);      

    // Evaluar el acceso

    const onSubmit = async (e) => {
        e.preventDefault(); 

        const formData = new FormData(e.target);
        const username = formData.get("username");
        const password = formData.get("password");
    
        let result = await usePost({"user": username, "password": password, "applicationId": 1}); // Llamar a la función usePost para realizar la solicitud de inicio de sesión
        localStorage.setItem('token', result.token);
        //navigate("/home"); // Redirige a la página de inicio después de iniciar sesión
        navigate("/jobapplication"); // Redirige a la página de inicio después de iniciar sesión
    }


    return (
        <>
        
            <Container fluid="sm">

                {error && (
                    <Alert variant="danger">{error}</Alert>
                )}
                {loading && (
                    <Alert variant="warning">Validando acceso, espere</Alert>
                )}

                <h1>Login</h1>
                <Row style={{ border: '1px solid black'}}>
                    <Col sm={5}>
                        <Form onSubmit={onSubmit}>
                            <Row style={{ paddingBottom: '3px'}}>
                                <Col sm={2}>
                                    <Form.Label column={1} style={{ textAlign: 'right'}}>Clave:</Form.Label>
                                </Col>
                                <Col sm={4}>
                                    <Form.Control type="text" name="username"></Form.Control>
                                </Col>
                            </Row>
                            <Row style={{ paddingBottom: '3px'}}>
                                <Col sm={2}>
                                <Form.Label column={1} style={{ textAlign: 'right'}}>Contraseña:</Form.Label>
                                </Col>
                                <Col sm={4}>
                                    <Form.Control type="password" name="password"></Form.Control>
                                </Col>
                            </Row>
                            <Row style={{ paddingBottom: '3px'}}>
                                <Col sm={6} style={{textAlign: 'center'}}>
                                    <Button type="submit">Acceder</Button>
                                </Col>
                            </Row>
                            <Row style={{ paddingBottom: '3px'}}>
                                <Col>
                                    <Link to="/passforgot">Recuperar contraseña</Link> | <Link to="/passreset">Cambiar contraseña</Link>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>  

            </Container>
            
        </>
    );
}
export default Login;