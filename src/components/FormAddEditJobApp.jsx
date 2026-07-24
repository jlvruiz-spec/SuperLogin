import { useEffect, useState } from "react";

import JobAppStatus from "./JobAppStatus";
import Input from "./Input";
import TextArea from "./TextArea";

import { useConnections } from "../hooks/useConnections";
import { crudService2 } from "../services/crudService2";

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
                jobApplicationCreationDate: new Date().toISOString(),
                jobApplicationId: parseInt(formData.get("Id")),
                jobApplicationStatusId: parseInt(formData.get("jobApplicationStatusId")),
                jobDescription: formData.get("descripcion"),
                location: formData.get("locacion"),
                recruiterName: formData.get("reclutador"),
                source: formData.get("fuente"),
                vacancyName: formData.get("nombre"),
                vacancyURL: formData.get("url")
            });
        } else {   
            let result = await AddJobApp({
                company: formData.get("empresa"),
                creationDate: new Date().toISOString(),
                isActive: true,
                jobApplicationCreationDate: new Date().toISOString(),
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
                <div style={{ border: '1px solid black', padding: '10px', marginBottom: '20px'}}>
                    <div onClick={() => {onClose(), clearAll()}} style={{ float: 'right'}} >X</div>
                    <h3>{id !== 0 ? `Editar Registro` : 'Nuevo Registro'}</h3>
                    <form onSubmit={saveEditJobApp} onReset={clearAll} style={{ border: '0px solid black', padding: '10px', marginBottom: '20px'}}>
                        <input name="Id" value={id} type="hidden" />
                        <input name="userId" defaultValue={formUserId} type="hidden" />
                        <Input name="nombre" defaultValue={formNombre} label="Nombre:" />
                        <Input name="url" defaultValue={formUrl} label="URL:" />
                        <Input name="empresa" defaultValue={formEmpresa} label="Empresa:" />
                        <Input name="reclutador" defaultValue={formReclutador} label="Reclutador:" />
                        <Input name="locacion" defaultValue={formLocacion} label="Locación:" />
                        <TextArea name="descripcion" defaultValue={formDescripcion} label="Descripción:"></TextArea>
                        <Input name="fuente" defaultValue={formSource} label="Fuente:" />
                        Estado:<JobAppStatus status={formStatus} onChange={handleStatusChange}></JobAppStatus>
                        <p><button className="counter" type="submit">Guardar</button> <button className="counter" type="reset">Descartar</button></p>
                    </form>
                </div>
            )}

        </>
    );
}
export default FormAddEditJobApp;