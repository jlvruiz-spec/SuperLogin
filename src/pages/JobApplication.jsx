import { useState, useEffect, Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const FormAddEditJobApp  = lazy(() => import("../components/FormAddEditJobApp"));

import { useConnections } from "../hooks/useConnections";
import { crudService2 } from "../services/crudService2";

import Dates from "../utils/dates";

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';


const JobApplication = () => {

    const [showIdInTable] = useState(false);
    const [data, setData] = useState([]);
    const [idJobApplication, setIdJobApplication] = useState(0);
    const [viewAddEdit, setViewAddEdit] = useState(false);
    const [show, setShow] = useState(false);

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
        //console.log(data);
    }

    const getJobApplicationById = async (id) => {
        setIdJobApplication(id);
        setViewAddEdit(true);
    }

    const newJobApplication = () => {
        setIdJobApplication(0);
        setViewAddEdit(true);
    }

    const FormAddEditJobAppClose = () => {
      setViewAddEdit(false);
    }

    const handleClose = () => setViewAddEdit(false);

    useEffect(() => {
        getAllJobApplications();
    }, []);  
    
    // const obtenido = data.filter((item) => item.jobApplicationCreationDate === "2026-07-25T00:00:00").length;
    // console.log(obtenido)

  return (
    <>
        <h1>Seguimiento Empleos</h1>

        {error && (
            <Alert variant="danger">{error}</Alert>
        )}
        {/* <center><Button onClick={() => newJobApplication(0)}>Agregar nuevo seguimiento a empleo</Button></center> */}
        <p>&nbsp;</p>

        
        {viewAddEdit && idJobApplication >= 0 && (
           <FormAddEditJobApp 
             id={idJobApplication} 
             viewAddEdit={viewAddEdit} 
             onClose={FormAddEditJobAppClose} 
             onSaved={()=> {getAllJobApplications(), setViewAddEdit(false);}}
           ></FormAddEditJobApp>
        )}
        
        {loading && 
          <Alert variant="warning">Cargando registros, espere</Alert> 
        } 

<p>Filtrar por fecha</p>
<p>Del Al</p>
        <Table striped bordered hover size="sm" >
          <thead>
            <tr>
              {showIdInTable && (
                <th>Id</th>
              )}
              <th>Fecha Creación</th>
              <th>Posición</th>
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
                    {showIdInTable && (
                      <td>{item.jobApplicationId}</td>
                    )}
                    <td>{Dates(item.jobApplicationCreationDate)}</td>
                    <td style={{ textAlign: 'left'}}>{item.vacancyName}</td>
                    <td style={{ textAlign: 'left'}}>{item.jobApplicationStatusDescription}</td>
                    <td style={{ textAlign: 'center'}}><Link to={`/interviews/${item.jobApplicationId}`}>Entrevistas</Link></td>
                    <td style={{ textAlign: 'center'}}><Link to={`/notes/${item.jobApplicationId}`}>Notas</Link></td>
                    <td style={{ textAlign: 'center'}}><Button variant="link" onClick={() => getJobApplicationById(item.jobApplicationId)}>Editar</Button></td>
                  </tr>
                )
              })
            }

          </tbody>
        </Table>    
        
    </>
  );
}
export default JobApplication;