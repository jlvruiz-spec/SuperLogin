import { useEffect, useState } from "react"; 
import { Link } from "react-router-dom";
import { useParams  } from "react-router-dom";

import FormAddEditNotes from "../components/FormAddEditNotes";

import { useConnections } from "../hooks/useConnections";
import { crudService2 } from "../services/crudService2";

import Dates from "../utils/dates";

const Notes = () => {

    const { id } = useParams();

    const [data, setData] = useState([]);
    const [addNew, setAddNew] = useState(false);
    const [idNote, setIdNote] = useState(0);
    const [formDescripcion, setFormDescripcion] = useState("");
    const [formUserId, setFormUserId] = useState(0);
    const [viewNote, setViewNote] = useState(false);

    const service = crudService2("api/v1/Note/GetByApplicationId/");
    const {
        loading,
        error,
        useGetRoute,
    } = useConnections(service);

    const getRecordById = async (id) => {
        setData(await useGetRoute(id));
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
            setIdNote(data[0].jobApplicationNoteId);
        }

    },[data]);

    const NotesClose = () => {
      setViewNote(false);
    }     

    return (
        <>
        <h1>Notas</h1>

        <p><Link to="/jobapplication" style={{ float: 'left'}}>&#60;&#60;Volver atrás |</Link> <Link to={`/interviews/${id}`} style={{ float: 'left'}}>&nbsp;Ver entrevistas&#62;&#62;</Link></p>

        <center><button className="counter" onClick={() => {setViewNote(true)}}>Agregar nueva nota</button></center>

        <FormAddEditNotes id={id} viewNote={viewNote} onClose={NotesClose} onSaved={() => {getRecordById(id), NotesClose()}}></FormAddEditNotes>

        {loading && <div style={{ color: 'orange', backgroundColor: '#eee2d1', padding: '5px'}}>Cargando notas, espere</div> }

        <table style={{ border: '1px solid black', borderCollapse: 'collapse', fontSize: '14px'}}>
            <thead>
                <tr className='tabla'>
                    <th>Fecha</th>
                    <th>Descripción</th>
                    {/* <th></th> */}
                </tr>
            </thead>
            <tbody>

                { data.map((item) => {
                        return (
                            <tr key={item.noteId}>
                                <td className='tds' style={{ textAlign: 'left'}}>{Dates(item.noteDate)}</td>
                                <td className='tds' style={{ textAlign: 'left'}}>{item.noteDescription}</td>
                                {/* <td className='tds'><button onClick={() => getNoteTypeById(item.jobApplicationId)} type="button" className="counter">Editar</button></td> */}
                            </tr>
                        )
                    })
                }
                { data.length === 0 && <div>No hay registros</div>}


            </tbody>
        </table>        
        </>
    )
}
export default Notes;