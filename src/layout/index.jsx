import { Outlet } from "react-router-dom";

import Menu from "../components/Menu";
import MenuUsuario from "../components/MenuUsuario";

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Layout = () => {

    return (
        <Container fluid="sm">
            <Row style={{ borderBottom: '0px solid black', marginTop: '10px'}}><Col ><MenuUsuario /></Col></Row>
            <Row style={{ minHeight: '660px'}}><Col><Outlet /></Col></Row>
            <Row><Col style={{ textAlign: 'center', borderTop: '1px solid black'}}>©2026</Col></Row>
        </Container>
    );
}
export default Layout;