import { useState, useEffect } from "react";

import { useConnections } from "../hooks/useConnections";
import { crudService2 } from "../services/crudService2";

const NoteTypes = () => {   

    const [data, setData] = useState([]);

    const service = crudService2("api/v1/NoteType/");
    const {
        loading,
        error,
        useGet,
        useGetRoute
    } = useConnections(service);        

    const getAll = async () => {
        setData(await useGet());
    }

    const getNoteTypeById = async (id) => {
        let result = await useGetRoute(id);
        console.log(result)
        // Implementation for fetching note type by ID
    }

    useEffect(() => {
        getAll();
    }, []);     


    return (
        <div>
            <h1>Tipos de Notas</h1> 

            {loading && <div style={{ color: 'orange', backgroundColor: '#eee2d1', padding: '5px'}}>Cargando, espere</div> }
            
            <table style={{ border: '1px solid black', borderCollapse: 'collapse', fontSize: '14px'}}>
                <thead>
                    <tr className='tabla'>
                        <th>Descripción</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>

                    { 
                    data.map((item) => {
                        return (
                            <tr key={item.noteTypeId}>
                                <td className='tds' style={{ textAlign: 'left'}}>{item.noteTypeDescription}</td>
                                <td className='tds'><button onClick={() => getNoteTypeById(item.noteTypeId)} type="button" className="counter">Editar</button></td>
                            </tr>
                        )
                    })
                    }

                </tbody>
            </table>              
        </div>
    )
}   
export default NoteTypes;