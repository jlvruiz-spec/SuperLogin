import { useEffect, useState } from "react";

import Input from "./Input";
import TextArea from "./TextArea";

import { useConnections } from "../hooks/useConnections";
import { crudService2 } from "../services/crudService2";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

const FormAddEditInterview = ({ id, viewInterview, onClose, onSaved }) => {

    const [viewFormAddEditInterviews, setViewFormAddEditInterviews] = useState(false);
    const [formDescripcion, setFormDescripcion] = useState("");
    const [formDate, setFormDate] = useState("");
    
    const service = crudService2("api/v1/JobApplicationInterview/");
    const {
        loading,
        error,
        usePost,
    } = useConnections(service);    
    
    const saveEditRecord = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        if (formData.get("descripcion") === ""){
            alert("Agregue los datos necesarios para guardar");
            return;
        }
        let result = await usePost({
            jobApplicationId: id,
            interviewDate: new Date(formData.get("fecha")).toISOString(), //new Date().toISOString(),
            interviewDescription: formData.get("descripcion")
        });
        if (onSaved) onSaved();
    }

    const clearAll = (e) => {
        setFormDescripcion("");  
    }

    useEffect(() => {

    }, [id]);     
        
    return (
        <>
            {error && (
                <Alert variant="danger">{error}</Alert>
            )}
            
            {viewInterview && (
                <>

                <Modal 
                    show={viewInterview} 
                    onHide={onClose}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton><h3>Guardar Registro</h3></Modal.Header>
                    <Modal.Body>

                            <Form onSubmit={saveEditRecord} onReset={clearAll}>
                                <Row style={{ paddingBottom: '3px'}}>
                                    <Col sm={3}><Form.Label column={1} style={{ textAlign: 'right'}}>Fecha:</Form.Label></Col>
                                    <Col sm={7}><Form.Control name="fecha" defaultValue={formDate} type="datetime-local"></Form.Control></Col>
                                </Row> 
                                <Row style={{ paddingBottom: '3px'}}>
                                    <Col sm={3}><Form.Label column={1} style={{ textAlign: 'right'}}>Descripción:</Form.Label></Col>
                                    <Col sm={7}><Form.Control as="textarea" rows={3} name="descripcion" defaultValue={formDescripcion}></Form.Control></Col>
                                </Row>
                                <Row style={{ paddingBottom: '3px'}}>
                                    <Col style={{ textAlign: 'center'}}><Button type="submit">Guardar</Button> <Button variant="secondary" type="reset">Limpiar formulario</Button></Col>
                                </Row>
                            </Form>

                        </Modal.Body>
                    </Modal> 
                 

                </>
            )}
        </>
    )
}

export default FormAddEditInterview;