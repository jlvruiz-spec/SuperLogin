import { useEffect, useState } from "react";

import Input from "./Input";
import TextArea from "./TextArea";

import { useConnections } from "../hooks/useConnections";
import { crudService2 } from "../services/crudService2";

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
            {error && <div style={{ color: 'red', backgroundColor: '#f3cec8', padding: '5px'}}>{error}</div>}
            
            {viewInterview && (
                <div style={{ width: '100%', border: '1px solid black', marginBottom: '10px'}}>
                    
                    <div onClick={() => {onClose()}} style={{ float: 'right'}} >X</div>
                    
                    <form onSubmit={saveEditRecord} onReset={clearAll} style={{ border: '0px solid black', padding: '10px', marginBottom: '20px'}}>
                        <Input name="fecha" defaultValue={formDate} label="Fecha:" type="Date"></Input>
                        <TextArea name="descripcion" defaultValue={formDescripcion} label="Descripción:" ></TextArea>
                        <p><button className="counter" type="submit">Guardar</button> <button className="counter" type="reset">Limpiar formulario</button></p>
                    </form>

                </div>
            )}
        </>
    )
}

export default FormAddEditInterview;