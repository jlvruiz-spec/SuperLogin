import { useState, useEffect, Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const FormAddEditJobApp  = lazy(() => import("../components/FormAddEditJobApp"));

import { useConnections } from "../hooks/useConnections";
import { crudService2 } from "../services/crudService2";

import Dates from "../utils/dates";

import Table from 'react-bootstrap/Table';
import Pagination from "react-bootstrap/Pagination";
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const JobApplication = () => {

    const [showIdInTable] = useState(false);
    const [data, setData] = useState([]);
    const [idJobApplication, setIdJobApplication] = useState(0);
    const [viewAddEdit, setViewAddEdit] = useState(false);
    const [show, setShow] = useState(false);

    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10); 
    const [totalPages, setTotalPages] = useState(0);

    const navigate = useNavigate();

    //const service = crudService2("api/v1/JobApplication/GetJobApplicationByUserId"); // Todos sin paginación
    const service = crudService2("api/v1/JobApplication/JobApplications?"); // con paginación
    
    const {
        loading,
        error,
        useGet,
        useGetRoute
    } = useConnections(service);        

    const getAllJobApplications = async () => {
        const result = await useGet(`pageNumber=${pageNumber}&pageSize=${pageSize}`);
        setData(result.items);
        setTotalPages(result.totalPages);
    }

    const getJobApplicationById = async (id) => {
        setIdJobApplication(id);
        setViewAddEdit(true);
    }

    const newJobApplication = () => {
        setIdJobApplication(0);
        setViewAddEdit(true);
    }

    const FormAddEditJobAppClose = () => setViewAddEdit(false);

    const handleClose = () => setViewAddEdit(false);

    useEffect(() => {
        getAllJobApplications();
    }, [pageNumber, pageSize]);  
    
    // const obtenido = data.filter((item) => item.jobApplicationCreationDate === "2026-07-25T00:00:00").length;
    // console.log(obtenido)

  return (
    <>
        <h1>Seguimiento Empleos</h1>

        {error && (
            <Alert variant="danger">{error}</Alert>
        )}        
        
        <Row sm="auto">
            <Col><Button variant="success" onClick={() => newJobApplication(0)}>Agregar Nuevo Seguimiento de Empleo</Button></Col>
        </Row>

        <p>&nbsp;</p>

        {viewAddEdit && idJobApplication >= 0 && (
           <FormAddEditJobApp 
             id={idJobApplication} 
             viewAddEdit={viewAddEdit} 
             onClose={FormAddEditJobAppClose} 
             onSaved={()=> {getAllJobApplications(), setViewAddEdit(false);}}
           ></FormAddEditJobApp>
        )}
        
        {/* <p>Filtrar por fecha</p>
        <p>Del Al</p> */}
        <Row style={{ paddingBottom: '15px'}}>
          <Col sm={3} style={{textAlign: 'right'}}>Mostrar registros por página:</Col>
          <Col sm={2}>
            <Form.Select name="recsByPage" value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </Form.Select>
          </Col>
        </Row>
        
        <Table striped bordered hover size="sm" >
          <thead>
            <tr>
              <th>Fecha Creación</th>
              <th>Empresa</th>
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
                    <td>{Dates(item.jobApplicationCreationDate)}</td>
                    <td style={{ textAlign: 'left'}}>{item.company}</td>
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
          <tfoot>
            <tr>
              <td colSpan={7} style={{ textAlign: 'center'}}>
                
                  <Pagination>
                    Registros por página: {pageSize} | Página {pageNumber} de {totalPages} &nbsp;
                    <Pagination.Prev
                      disabled={pageNumber === 1}
                      onClick={() => setPageNumber(pageNumber - 1)}
                    />
                    {[...Array(totalPages)].map((_, i) => (
                      <Pagination.Item
                        key={i + 1}
                        active={i + 1 === pageNumber}
                        onClick={() => setPageNumber(i + 1)}
                      >
                        {i + 1}
                      </Pagination.Item>
                    ))}
                    <Pagination.Next
                      disabled={pageNumber === totalPages}
                      onClick={() => setPageNumber(pageNumber + 1)}
                    />
                  </Pagination>

              </td>
            </tr>
          </tfoot>
        </Table>  

        { loading ? ( 
            <Alert variant="warning">Cargando registros, espere</Alert> 
        ) : ( data.length === 0 ?  (
            <Alert variant="info">No hay registros</Alert>
        ) : null) }   
      
    </>
  );
}
export default JobApplication;