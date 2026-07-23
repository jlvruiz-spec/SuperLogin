import { useEffect, useState } from "react";

import Input from "./Input";

import { useConnections } from "../hooks/useConnections";
import { crudService2 } from "../services/crudService2";

const ModalInterviews = ({ id, viewInterview, onClose }) => {

    const [data, setData] = useState([]);
    const [addNew, setAddNew] = useState(false);
    const [idInterview, setIdInterview] = useState(0);
    const [formDescripcion, setFormDescripcion] = useState("");
    const [formUserId, setFormUserId] = useState(0);

    const service = crudService2("api/v1/JobApplicationInterview/GetByApplicationId/");
    const {
        loading,
        error,
        usePost,
        useGetRoute,
    } = useConnections(service);

    const getRecordById = async (id) => {
        setData(await useGetRoute(id));
    }

    const saveEditInterview = () => {

    }

    const clearAll = (e) => {
        setFormDescripcion("");  
        setFormUserId(0);
    }

    useEffect(() => {
        getRecordById(id);        
    }, [id]);

    useEffect(() => {

        if (data.length === 0){
            setAddNew(true);
        } 
        else if(data.length === 1) {
            setAddNew(false);            
            setIdInterview(data[0].jobApplicationInterviewId);
        }

    },[data]);


    return (
        <>
        
        {loading && <div style={{ color: 'orange', backgroundColor: '#eee2d1', padding: '5px'}}>Cargando formulario de entrevistas, espere</div> }

        {viewInterview && (
            <div style={{ border: '1px solid black', padding: '20px'}}>
                <div onClick={onClose} style={{ float: 'right'}} >X</div>

                <h3>Entrevistas</h3> 

                {addNew && (
                    <button className="counter">Agregar entrevista</button>
                )}

                <div style={{ height: '100px'}}>
                    <div style={{ width: '30%', float: 'left'}}>
                        
                        <table style={{ border: '1px solid black', borderCollapse: 'collapse', fontSize: '14px'}}>
                            <thead>
                                <tr className='tabla'>
                                    <th>Fecha</th>
                                    <th>Descripción</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>

                                { 
                                    data.map((item) => {
                                        return (
                                            <tr key={item.jobApplicationInterviewIdId}>
                                                <td className='tds' style={{ textAlign: 'left'}}>{item.interviewDate}</td>
                                                <td className='tds' style={{ textAlign: 'left'}}>{item.interviewDescription}</td>
                                                <td className='tds'><button onClick={() => getNoteTypeById(item.jobApplicationInterviewId)} type="button" className="counter">Editar</button></td>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table>
                        
                    </div>

                    <div style={{ width: '30%', float: 'left'}}>

                        {addNew && (
                            <form onSubmit={saveEditInterview} onReset={clearAll} style={{ border: '0px solid black', padding: '10px', marginBottom: '20px'}}>
                                <input name="Id" value={id} type="hidden" />
                                <input name="userId" defaultValue={formUserId} type="hidden" />
                                <Input name="descripcion" defaultValue={formDescripcion} label="Descripción:" />
                                <p><button className="counter" type="submit">Guardar</button> <button className="counter" type="reset">Descartar</button></p>
                            </form>
                        )}

                    </div>
                </div>


            </div>
        )}
        </>
    )
}
export default ModalInterviews;