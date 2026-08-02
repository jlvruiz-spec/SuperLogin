import { useEffect, useState } from "react";

import Input from "./Input";
import TextArea from "./TextArea";
import SelectNoteType from "./SelectNoteType";

import { useConnections } from "../hooks/useConnections";
import { crudService2 } from "../services/crudService2";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';


const FormAddEditNotes = ({ id, viewNote, onClose, onSaved }) => {

    const [viewFormAddEditNotes, setViewFormAddEditNotes] = useState(false);
    const [formDate, setFormDate] = useState("");
    const [formDescripcion, setFormDescripcion] = useState("");
    const [formNoteType, setFormNoteType] = useState(0);
    
    const service = crudService2("api/v1/Note/");
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
            noteTypeId: formData.get("noteType"),
            noteDate: new Date(formData.get("fecha")).toISOString(),
            noteDescription: formData.get("descripcion")
        });
        if (onSaved) onSaved();
    }

    const clearAll = (e) => {
        setFormDescripcion(""); 
        setFormFecha(""); 
        setFormNoteType(0); 
    }

    const handleStatusChange = ({ name }) => {
        setFormDescripcion(name);
        setFormFecha(""); 
        setFormNoteType(0);
    };
        
    return (
        <>
            {error && <Alert variant="danger">{error}</Alert>}

            {viewNote && (
   
                <Modal 
                    show={viewNote} 
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
                                <Col sm={7}><Form.Control as="textarea" rows={3} name="descripcion" defaultValue={formDescripcion} onChange={e => console.log(e.target.value)}></Form.Control></Col>
                            </Row>
                            <Row style={{ paddingBottom: '3px'}}>
                                <Col sm={3}><Form.Label column={1} style={{ textAlign: 'right'}}>Tipo Nota:</Form.Label></Col>
                                <Col sm={7}><SelectNoteType status={formNoteType} onChange={handleStatusChange}></SelectNoteType></Col>
                            </Row>
                            <Row style={{ paddingBottom: '3px'}}>
                                <Col style={{ textAlign: 'center'}}>
                                    <Button type="submit">Guardar</Button>&nbsp; 
                                    <Button variant="secondary" type="reset">Limpiar formulario</Button>&nbsp;
                                    <Button variant="warning" onClick={onClose}>Cerrar Modal</Button>
                                </Col>
                            </Row>
                        </Form>

                        </Modal.Body>
                </Modal>
            )}

        </>
    )
}

export default FormAddEditNotes;