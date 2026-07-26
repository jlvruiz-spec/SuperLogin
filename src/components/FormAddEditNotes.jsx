import { useEffect, useState } from "react";

import Input from "./Input";
import TextArea from "./TextArea";
import SelectNoteType from "./SelectNoteType";

import { useConnections } from "../hooks/useConnections";
import { crudService2 } from "../services/crudService2";

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
            {error && <div style={{ color: 'red', backgroundColor: '#f3cec8', padding: '5px'}}>{error}</div>}

            {viewNote && (
                <div style={{ width: '100%', border: '1px solid black', marginBottom: '10px'}}>

                    <div onClick={() => {onClose()}} style={{ float: 'right'}} >X</div>

                    <form onSubmit={saveEditRecord} onReset={clearAll} style={{ border: '0px solid black', padding: '10px', marginBottom: '20px'}}>
                        <Input name="fecha" defaultValue={formDate} label="Fecha:" type="Date"></Input>
                        <TextArea name="descripcion" defaultValue={formDescripcion} label="Descripción:" ></TextArea>
                        <SelectNoteType status={formNoteType} onChange={handleStatusChange}></SelectNoteType>
                        <p><button className="counter" type="submit">Guardar</button> <button className="counter" type="reset">Limpiar Formulario</button></p>
                    </form>

                </div>
            )}        
        </>
    )
}

export default FormAddEditNotes;