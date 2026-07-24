import { useEffect, useState } from "react";

import Input from "./Input";
import TextArea from "./TextArea";
import SelectNoteType from "./SelectNoteType";

import { useConnections } from "../hooks/useConnections";
import { crudService2 } from "../services/crudService2";

const FormAddEditNotes = ({ id, onSaved }) => {

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
            noteDate: new Date().toISOString(),
            noteDescription: formData.get("descripcion")
        });
        if (onSaved) onSaved();
    }

    const clearAll = (e) => {
        setFormDescripcion(""); 
        setFormNoteType(0); 
    }

    const handleStatusChange = ({ name }) => {
        setFormDescripcion(name);
        setFormNoteType(0);
    };
        
    return (
        <>
            {error && <div style={{ color: 'red', backgroundColor: '#f3cec8', padding: '5px'}}>{error}</div>}

            <form onSubmit={saveEditRecord} onReset={clearAll} style={{ border: '0px solid black', padding: '10px', marginBottom: '20px'}}>
                <TextArea name="descripcion" defaultValue={formDescripcion} label="Descripción:" ></TextArea>
                <SelectNoteType status={formNoteType} onChange={handleStatusChange}></SelectNoteType>
                <p><button className="counter" type="submit">Guardar</button> <button className="counter" type="reset">Descartar</button></p>
            </form>        
        </>
    )
}

export default FormAddEditNotes;