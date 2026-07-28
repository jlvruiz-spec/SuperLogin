
import { useState, useEffect } from "react";

import { useConnections } from "../hooks/useConnections";
import { crudService2 } from "../services/crudService2";

import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

const SelectNoteType = ({ status, onChange }) => {
 
    const [data, setData] = useState([]);
    const [selectedName, setSelectedName] = useState("");

    const service = crudService2("api/v1/NoteType");
    const {
        loading,
        error,
        useGet
    } = useConnections(service);        

    const getAll = async () => {
        setData(await useGet());
    }

    const handleChange = (e) => {
        const id = e.target.value;
        const name = e.target.options[e.target.selectedIndex].text;

        setSelectedName(name);

        // 👇 notifica al padre
        if (onChange) {
            onChange({ name });
        }
    };    

    useEffect(() => {
        getAll();
    }, []);    
    
    return (
        <>
        {loading && (             
            <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando Tipos de Notas...</span>
            </Spinner>            
        )}

        <Form.Select name="noteType" onChange={handleChange}>
            
            { 
                data.map((item) => {
                  return (   
                    <option 
                        key={item.noteTypeId} 
                        value={item.noteTypeId} 
                        selected={status === item.noteTypeId}
                        //defaultValue={status === item.jobApplicationStatusId}
                    >{item.noteTypeDescription}</option>
                  )
                })
            }
        </Form.Select>
        </>
    )
}
export default SelectNoteType;