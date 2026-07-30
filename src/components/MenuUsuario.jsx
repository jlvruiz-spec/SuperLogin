import { useState, useEffect } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { useConnections } from "../hooks/useConnections";
import { crudService3 } from "../services/crudService3";

import UserName from "./UserName";

import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

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
        <Row>
            <Col>
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
            </Col>
            <Col><UserName></UserName> </Col>
        </Row>
      </>        
    )
}
export default MenuUsuario;