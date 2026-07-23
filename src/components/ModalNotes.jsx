import { useEffect, useState } from "react";

import { useConnections } from "../hooks/useConnections";
import { crudService2 } from "../services/crudService2";

const ModalNotes = ({ id, viewNotes, onClose }) => {

    const [data, setData] = useState([]);

    const service = crudService2("api/v1/Note/GetByApplicationId/");
    const {
        error,
        useGetRoute,
    } = useConnections(service);    

    const getRecordById = async (id) => {
        setData(await useGetRoute(id));
    }

    useEffect(() => {
        getRecordById(id);
    }, [id]);     

    return (
        <>
            {viewNotes && (
            <div style={{ border: '1px solid black', padding: '20px'}}>
                <div onClick={onClose} style={{ float: 'right'}} >X</div>
                <h3>Notas</h3> 
                
                <button className="counter" >Agregar nota</button>

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
                                    <tr key={item.noteId}>
                                        <td className='tds' style={{ textAlign: 'left'}}>{item.noteDate}</td>
                                        <td className='tds' style={{ textAlign: 'left'}}>{item.noteDescription}</td>
                                        <td className='tds'><button onClick={() => getNoteTypeById(item.jobApplicationId)} type="button" className="counter">Editar</button></td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
        )}       
        </>
    )
}
export default ModalNotes;