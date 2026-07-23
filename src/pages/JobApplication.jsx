import { useState, useEffect } from "react";

import FormAddEditJobApp from "../components/FormAddEditJobApp";
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
    }

    const InterviewsClose = () => {
      setviewInterview(false);
    }

    useEffect(() => {
        getAllJobApplications();
    }, []);   

  return (
    <div>
        <h1>Aplicación a Empleo</h1>

        {error && <div style={{ color: 'red', backgroundColor: '#f3cec8', padding: '5px'}}>{error}</div>}

        <center><button className="counter" onClick={() => {setViewAddEdit(true), setIdJobApplication(0)}}>Agregar nueva aplicación a empleo</button></center>
        
        {!viewAddEdit && idJobApplication > 0 && (
          <FormAddEditJobApp id={idJobApplication} viewAddEdit={viewAddEdit} onClose={FormAddEditJobAppClose}></FormAddEditJobApp>
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
              <th>Aplicación Id</th>
              <th>Fecha Creación</th>
              <th>Nombre</th>
              <th>URL</th>
              <th>Empresa</th>
              <th>Reclutador</th>
              <th>Remoto/Presencial</th>
              <th>Descripción</th>
              <th>Estado</th>
              <th>Fuente</th>
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
                  <td className='tds'>{item.jobApplicationId}</td>
                  <td className='tds'>{Dates(item.jobApplicationCreationDate)}</td>
                  <td className='tds' style={{ textAlign: 'left'}}>{item.vacancyName}</td>
                  <td className='tds' style={{ textAlign: 'left'}}>{item.vacancyURL == "" ? "No disponible" : item.vacancyURL}</td>
                  <td className='tds' style={{ textAlign: 'left'}}>{item.company}</td>
                  <td className='tds' style={{ textAlign: 'left'}}>{item.recruiterName}</td>
                  <td className='tds' style={{ textAlign: 'left'}}>{item.location}</td>
                  <td className='tds' style={{ textAlign: 'left'}}>{item.jobDescription}</td>
                  <td className='tds' style={{ textAlign: 'left'}}>{item.jobApplicationStatusDescription}</td>
                  <td className='tds' style={{ textAlign: 'left'}}>{item.source}</td>
                  <td className='tds'><button onClick={() => Notes(item.jobApplicationId)} type="button" className="counter">Notas</button></td>
                  <td className='tds'><button onClick={() => Interviews(item.jobApplicationId)} type="button" className="counter">Entrevistas</button></td>
                  <td className='tds'><button onClick={() => getJobApplicationById(item.jobApplicationId)} type="button" className="counter">Editar</button></td>
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