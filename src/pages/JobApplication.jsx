import { useState, useEffect, Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const FormAddEditJobApp  = lazy(() => import("../components/FormAddEditJobApp"));
import ModalNotes from "../components/ModalNotes";
import ModalInterviews from "../components/ModalInterviews";

import { useConnections } from "../hooks/useConnections";
import { crudService2 } from "../services/crudService2";

import Dates from "../utils/dates";

const JobApplication = () => {

    const [data, setData] = useState([]);
    const [idJobApplication, setIdJobApplication] = useState(0);
    const [viewAddEdit, setViewAddEdit] = useState(false);
    const [notesView, setNotesView] = useState(false);
    const [viewInterview, setviewInterview] = useState(false);

    const navigate = useNavigate();

    const service = crudService2("api/v1/JobApplication/GetJobApplicationByUserId");
    const {
        loading,
        error,
        useGet,
        useGetRoute
    } = useConnections(service);        

    const getAllJobApplications = async () => {
        setData(await useGet());
    }

    const getJobApplicationById = async (id) => {
        setIdJobApplication(id);
        setViewAddEdit(true);
        setviewInterview(false);
        setNotesView(false);
    }

    const newJobApplication = () => {
        setIdJobApplication(0);
        setViewAddEdit(true);
        setviewInterview(false);
        setNotesView(false);
    }

    const FormAddEditJobAppClose = () => {
      setViewAddEdit(false);
    }    

    const Notes = async (id) => {
        setIdJobApplication(id);
        setViewAddEdit(false);
        setviewInterview(false);
        setNotesView(true);
    }

    const NotesClose = () => {
      setNotesView(false);
    }

    const Interviews = async (id) => {
      setIdJobApplication(id);
      setViewAddEdit(false);
      setviewInterview(true);
      setNotesView(false);
      navigate("/interviews/id");
    }

    const InterviewsClose = () => {
      setviewInterview(false);
    }

    useEffect(() => {
        getAllJobApplications();
    }, []);   

  return (
    <div>
        <h1>Seguimiento Empleos</h1>

        {error && <div style={{ color: 'red', backgroundColor: '#f3cec8', padding: '5px'}}>{error}</div>}

        <center><button className="counter" onClick={() => newJobApplication(0)}>Agregar nueva aplicación a empleo</button></center>
        
        {viewAddEdit && idJobApplication >= 0 && (
          <FormAddEditJobApp id={idJobApplication} viewAddEdit={viewAddEdit} onClose={FormAddEditJobAppClose} ></FormAddEditJobApp>
        )}
        
          <ModalNotes id={idJobApplication} viewNotes={notesView} onClose={NotesClose}></ModalNotes>
        
        {!viewAddEdit && idJobApplication > 0 && (
          <ModalInterviews id={idJobApplication} viewInterview={viewInterview} onClose={InterviewsClose}></ModalInterviews>
        )}

        <p>&nbsp;</p>
        {loading && <div style={{ color: 'orange', backgroundColor: '#eee2d1', padding: '5px'}}>Cargando registros, espere</div> }

        <table style={{ border: '1px solid black', borderCollapse: 'collapse', fontSize: '14px'}}>
          <thead>
            <tr className='tabla'>
              {/* <th>Id</th> */}
              <th>Fecha Creación</th>
              <th>Nombre</th>
              <th>Estado</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>

            { 
              data.map((item) => {
                return (
                <tr key={item.jobApplicationId}>
                  {/* <td className='tds'>{item.jobApplicationId}</td> */}
                  <td className='tds'>{Dates(item.jobApplicationCreationDate)}</td>
                  <td className='tds' style={{ textAlign: 'left'}}>{item.vacancyName}</td>
                  <td className='tds' style={{ textAlign: 'left'}}>{item.jobApplicationStatusDescription}</td>
                  <td className='tds'><Link to={`/interviews/${item.jobApplicationId}`}>Entrevistas</Link></td>
                  <td className='tds'><Link to={`/notes/${item.jobApplicationId}`}>Notas</Link></td>
                  <td className='tds'><button onClick={() => getJobApplicationById(item.jobApplicationId)} type="button" className="counter">Editar{item.jobApplicationI}</button></td>
                </tr>
                )
              })
            }

          </tbody>
        </table>    
        
    </div>
  );
}
export default JobApplication;