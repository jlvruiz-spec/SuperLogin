import { useState, useEffect } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";

import { useConnections } from "../hooks/useConnections";
import { crudService3 } from "../services/crudService3";

import UserName from "./UserName";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Spinner from 'react-bootstrap/Spinner';

const MenuUsuario = () => {

    const [getted, setGetted] = useState([]);

    const navigate = useNavigate();

    const service = crudService3("api/v1/Menu/GetByRoleId");
    const {
        loading,
        error,
        useGet
    } = useConnections(service);
    
    const getRecords = async () => {
        let result = await useGet();
        setGetted(result);
        navigate(result[0].url)
    }

    const getOut = () => {
        for (const key in localStorage) {
            delete localStorage[key];
        }
        navigate("/");
    }
    
    useEffect(() => {
        getRecords();
    }, []);    

    return (
        <>
        <Container>
        <Row sm="auto">
            <Col md={4}>
                { getted.map((item) => {
                    return (            
                        <Button onClick={() => navigate(item.url)} style={{ marginRight: '5px'}}>
                            {item.menuName}
                        </Button>
                    )
                })}
                <Button onClick={() => navigate("/")}>
                    Salir
                </Button>
                {loading ? <Spinner animation="border" /> : ""}
            </Col>
            <Col md={{ span: 4, offset: 4 }}><UserName></UserName></Col>
            
        </Row>
        </Container>
      </>        
    )
}
export default MenuUsuario;