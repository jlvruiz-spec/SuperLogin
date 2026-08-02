import { useEffect, useState, Suspense, lazy } from "react"; 
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useParams  } from "react-router-dom";

import FormAddEditInterview from "../components/FormAddEditInterview";
import CompanyName from "../components/CompanyName";
const FormAddEditJobApp  = lazy(() => import("../components/FormAddEditJobApp"));

import { useConnections } from "../hooks/useConnections";
import { crudService2 } from "../services/crudService2";

import Dates from "../utils/dates";

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Interviews = () => {

    const { id } = useParams();

    const [data, setData] = useState([]);
    const [addNew, setAddNew] = useState(false);
    const [idInterview, setIdInterview] = useState(0);
    const [formDescripcion, setFormDescripcion] = useState("");
    const [formUserId, setFormUserId] = useState(0);
    const [viewInterview, setViewInterview] = useState(false);
    const [viewAddEdit, setViewAddEdit] = useState(false);

    const navigate = useNavigate();

    const service = crudService2("api/v1/JobApplicationInterview/GetByApplicationId/");
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
            setIdInterview(data[0].jobApplicationInterviewId);
        }

    },[data]);

    const InterviewsClose = () => setViewInterview(false);

    const FormAddEditJobAppClose = () => setViewAddEdit(false);

    return (
        <>

        <h1>Entrevistas <CompanyName id={id} /></h1>

        {/* <p>
            <Link type="button" to={`/notes/${id}`} class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" style={{ float: 'left'}}>Ver Notas</Link>
            <Link to="/jobs" class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" style={{ float: 'left'}}>&#60;&#60;Volver atrás |</Link>&nbsp;
        </p>*/}

        <Row sm="auto">
            <Col><Button variant="info" onClick={() => navigate(`/notes/${id}`)}>Ver Notas</Button></Col>
            <Col><Button variant="success" onClick={() => {setViewInterview(true)}}>Agregar nueva entrevista</Button></Col>
            <Col><Button variant="warning" onClick={() => setViewAddEdit(true)}>Editar Registro</Button></Col>
            
        </Row>
        
        {viewAddEdit && (
           <FormAddEditJobApp 
             id={id} 
             viewAddEdit={viewAddEdit} 
             onClose={FormAddEditJobAppClose} 
             onSaved={()=> {setViewAddEdit(false);}}
           ></FormAddEditJobApp>
        )}

        <p>&nbsp;</p>
        <FormAddEditInterview id={id} viewInterview={viewInterview} onClose={InterviewsClose} onSaved={() => {getRecordById(id), InterviewsClose()} }></FormAddEditInterview>
        
        { loading ? ( 
            <Alert variant="warning">Cargando entrevistas, espere</Alert> 
        ) : ( data.length === 0 ?  (
            <Alert variant="info">No hay registros</Alert>
        ) : null) }      

        { data.length > 0 &&  (
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Descripción</th>
                        {/* <th></th> */}
                        {/* <th></th> */}
                    </tr>
                </thead>
                <tbody>

                    { data.length > 0 &&
                        data.map((item) => {
                            return (
                                <tr key={item.jobApplicationInterviewId}>
                                    <td style={{ textAlign: 'left'}}>{Dates(item.interviewDate)}</td>
                                    <td style={{ textAlign: 'left'}}>{item.interviewDescription}</td>
                                    {/* <td className='tds'><button onClick={() => {}} type="button" className="counter">Notas</button></td> */}
                                    {/* <td className='tds'><button onClick={() => getNoteTypeById(item.jobApplicationInterviewId)} type="button" className="counter">Editar</button></td> */}
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
export default Interviews;