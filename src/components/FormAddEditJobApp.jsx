import { useEffect, useState } from "react";

import JobAppStatus from "./JobAppStatus";
import Input from "./Input";
import TextArea from "./TextArea";

import { useConnections } from "../hooks/useConnections";
import { crudService2 } from "../services/crudService2";

import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

/**
 * Edición y alta de nuevos registros de seguimiento de empleos
 * @param id id del seguimiento de empleo
 * @param viewEditAdd variable false/true que permite visualizar o no el formulario (viene desde el padre)
 * @param onClose función que viene desde el padre para cerrar el formulario
 * @param onSaved función que viene desde el padre para evaluar y actualizar en el padre 
 */
const FormAddEditJobApp = ({ id, viewAddEdit, onClose, onSaved }) => {

    const [formNombre, setFormNombre] = useState("");
    const [formUrl, setFormUrl] = useState("");
    const [formEmpresa, setFormEmpresa] = useState("");
    const [formReclutador, setFormReclutador] = useState("");
    const [formLocacion, setFormLocacion] = useState("");
    const [formDescripcion, setFormDescripcion] = useState("");
    const [formStatus, setFormStatus] = useState(0);
    const [formStatusDescripcion, setFormStatusDescripcion] = useState("");
    const [formSource, setFormSource] = useState("");
    const [formDate, setFormDate] = useState("");
    const [formUserId, setFormUserId] = useState(0);

    const service = crudService2("api/v1/JobApplication/");
    const {
        loading,
        error,
        useGetRoute,
        usePost,
        usePut
    } = useConnections(service);

    const getJobApplicationById = async (id) => {
        let result = await useGetRoute(id);
        setFormNombre(result.vacancyName);
        setFormUrl(result.vacancyURL);
        setFormEmpresa(result.company);
        setFormReclutador(result.recruiterName);
        setFormLocacion(result.location);
        setFormDescripcion(result.jobDescription);
        setFormStatus(result.jobApplicationStatusId);
        setFormStatusDescripcion(result.jobApplicationStatusDescription);
        setFormSource(result.source);
        setFormDate(result.jobApplicationCreationDate);
        setFormUserId(result.userId);
    }

    const AddJobApp = async (params) => {
        let result = await usePost(params);
    }

    const EditJobApp = async (params) => {
        let result = await usePut(params);
    }

    const handleStatusChange = ({ name }) => {
        setFormStatusDescripcion(name);
    };

    const saveEditJobApp = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        if (formData.get("nombre") === ""){
            alert("Agregue los datos necesarios para guardar");
            return;
        }
        let params = {};
        if (parseInt(formData.get("Id")) != 0){
            await EditJobApp({
                company: formData.get("empresa"),
                jobApplicationCreationDate: new Date(formData.get("fecha")).toISOString(),
                jobApplicationId: parseInt(formData.get("Id")),
                jobApplicationStatusId: parseInt(formData.get("jobApplicationStatusId")),
                jobDescription: formData.get("descripcion"),
                location: formData.get("locacion"),
                recruiterName: formData.get("reclutador"),
                source: formData.get("fuente"),
                vacancyName: formData.get("nombre"),
                vacancyURL: formData.get("url"),
            });
        } else {   
            let result = await AddJobApp({
                company: formData.get("empresa"),
                creationDate: new Date().toISOString(),
                isActive: true,
                jobApplicationCreationDate: new Date(formData.get("fecha")).toISOString(),
                jobApplicationStatusDescription: formStatusDescripcion,
                jobApplicationStatusId: formData.get("jobApplicationStatusId"),
                jobDescription: formData.get("descripcion"),
                location: formData.get("locacion"),
                source: formData.get("fuente"),
                recruiterName: formData.get("reclutador"),
                userId: 1,
                vacancyName: formData.get("nombre"),
                vacancyURL: formData.get("url")}
            );    
        };
        if (onSaved) onSaved();
    }  
    
    const clearAll = (e) => {
        setFormNombre("");  
        setFormUrl("");  
        setFormEmpresa("");  
        setFormReclutador("");  
        setFormLocacion("");  
        setFormDescripcion("");  
        setFormStatus(0);  
        setFormStatusDescripcion("");  
        setFormSource("");
        setFormDate("");
        setFormUserId(0);
    }

    useEffect(() => {
        if (id !== 0) {
            getJobApplicationById(id);
        }
    }, [id]);    

    return (
        <>
            {/* {loading && <div style={{ color: 'orange', backgroundColor: '#eee2d1', padding: '5px'}}>Cargando formulario agregado/edición, espere</div> } */}
            
            {error && <div style={{ color: 'red', backgroundColor: '#f3cec8', padding: '5px'}}>{error}</div>}

            {viewAddEdit && (

                <Modal 
                    show={viewAddEdit} 
                    onHide={onClose}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton><h3>{id !== 0 ? `Editar Registro` : 'Nuevo Registro'}</h3></Modal.Header>
                    <Modal.Body>

                    <Form onSubmit={saveEditJobApp} onReset={clearAll} style={{ border: '0px solid black', padding: '10px', marginBottom: '20px'}}>
                        <input name="Id" value={id} type="hidden" />                        
                        <input name="userId" defaultValue={formUserId} type="hidden" />
                        <Row style={{ paddingBottom: '3px'}}>
                            <Col sm={3}><Form.Label column={1} style={{ textAlign: 'right'}}>Nombre:</Form.Label></Col>
                            <Col sm={7}><Form.Control name="nombre" defaultValue={formNombre} type="text"></Form.Control></Col>
                        </Row>
                        <Row style={{ paddingBottom: '3px'}}>
                            <Col sm={3}><Form.Label column={1} style={{ textAlign: 'right'}}>URL:</Form.Label></Col>
                            <Col sm={7}><Form.Control name="url" defaultValue={formUrl} type="text"></Form.Control></Col>
                        </Row>
                        <Row style={{ paddingBottom: '3px'}}>
                            <Col sm={3}><Form.Label column={1} style={{ textAlign: 'right'}}>Empresa:</Form.Label></Col>
                            <Col sm={7}><Form.Control name="empresa" defaultValue={formEmpresa} type="text"></Form.Control></Col>
                        </Row>
                        <Row style={{ paddingBottom: '3px'}}>
                            <Col sm={3}><Form.Label column={1} style={{ textAlign: 'right'}}>Reclutador:</Form.Label></Col>
                            <Col sm={7}><Form.Control name="reclutador" defaultValue={formReclutador} type="text"></Form.Control></Col>
                        </Row>
                        <Row style={{ paddingBottom: '3px'}}>
                            <Col sm={3}><Form.Label column={1} style={{ textAlign: 'right'}}>Locación:</Form.Label></Col>
                            <Col sm={7}><Form.Control name="locacion" defaultValue={formLocacion} type="text"></Form.Control></Col>
                        </Row>
                        <Row style={{ paddingBottom: '3px'}}>
                            <Col sm={3}><Form.Label column={1} style={{ textAlign: 'right'}}>Descripción:</Form.Label></Col>
                            <Col sm={7}><Form.Control as="textarea" rows={3} name="descripcion" defaultValue={formDescripcion}></Form.Control></Col>
                        </Row>
                         <Row style={{ paddingBottom: '3px'}}>
                            <Col sm={3}><Form.Label column={1} style={{ textAlign: 'right'}}>Fuente:</Form.Label></Col>
                            <Col sm={7}><Form.Control name="fuente" defaultValue={formSource} type="text"></Form.Control></Col>
                        </Row>
                        <Row style={{ paddingBottom: '3px'}}>
                            <Col sm={3}><Form.Label column={1} style={{ textAlign: 'right'}}>Fecha:</Form.Label></Col>
                            <Col sm={7}><Form.Control name="fecha" defaultValue={formDate} type="datetime-local"></Form.Control></Col>
                        </Row>
                        <Row style={{ paddingBottom: '3px'}}>
                            <Col sm={3}><Form.Label column={1} style={{ textAlign: 'right'}}>Estado:</Form.Label></Col>
                            <Col sm={7}><JobAppStatus status={formStatus} onChange={handleStatusChange}></JobAppStatus></Col>
                        </Row>
                        <Row><Col style={{ textAlign: 'center'}}><Button variant="success" type="submit">Guardar</Button> <Button variant="secondary" type="reset">Limpiar formulario</Button></Col></Row>
                    </Form>

                    </Modal.Body>
                </Modal> 

   
            )}

        </>
    );
}
export default FormAddEditJobApp;