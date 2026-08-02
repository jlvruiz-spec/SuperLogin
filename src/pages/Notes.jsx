import { useEffect, useState } from "react"; 
import { Link } from "react-router-dom";
import { useParams  } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import FormAddEditNotes from "../components/FormAddEditNotes";
import CompanyName from "../components/CompanyName";

import { useConnections } from "../hooks/useConnections";
import { crudService2 } from "../services/crudService2";

import Dates from "../utils/dates";

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Notes = () => {

    const { id } = useParams();

    const [data, setData] = useState([]);
    const [addNew, setAddNew] = useState(false);
    const [idNote, setIdNote] = useState(0);
    const [formDescripcion, setFormDescripcion] = useState("");
    const [formUserId, setFormUserId] = useState(0);
    const [viewNote, setViewNote] = useState(false);

    const navigate = useNavigate();

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

    const NotesClose = () => setViewNote(false);

    return (
        <>
        <h1>Notas <CompanyName id={id} /></h1>

        {/* <p>
            <Link to="/jobs" class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" style={{ float: 'left'}}>&#60;&#60;Volver atrás | </Link> 
            <Link to={`/interviews/${id}`} class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" style={{ float: 'left'}}>&nbsp;Ver entrevistas&#62;&#62;</Link>
        </p> */}

        <Row sm="auto">
            <Col><Button variant="info" onClick={() => navigate(`/interviews/${id}`)}>Ver Entrevistas</Button></Col>
            <Col><Button variant="success" onClick={() => {setViewNote(true)}}>Agregar Nueva Nota</Button></Col>
        </Row>        

        <p>&nbsp;</p>

        <FormAddEditNotes id={id} viewNote={viewNote} onClose={NotesClose} onSaved={() => {getRecordById(id), NotesClose()}}></FormAddEditNotes>

        {loading ? (
            <Alert variant="warning">Cargando notas, espere</Alert> 
        ) : ( data.length === 0 ? (
            <Alert variant="info">No hay registros</Alert>
        ) : null) }

        { data.length > 0 && (
        
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Descripción</th>
                        {/* <th></th> */}
                    </tr>
                </thead>
                <tbody>

                    { data.map((item) => {
                            return (
                                <tr key={item.noteId}>
                                    <td style={{ textAlign: 'left'}}>{Dates(item.noteDate)}</td>
                                    <td style={{ textAlign: 'left'}}>{item.noteDescription}</td>
                                    {/* <td className='tds'><button onClick={() => getNoteTypeById(item.jobApplicationId)} type="button" className="counter">Editar</button></td> */}
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        )}
        </>
    )
}
export default Notes;