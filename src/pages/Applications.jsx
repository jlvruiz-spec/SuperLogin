import { useState, useEffect } from "react";

import { useConnections } from "../hooks/useConnections";
import { crudService } from "../services/crudService";

const Applications = () => {

    const [data, setData] = useState([]);

    const service = crudService("api/Application");
    const {
        loading,
        error,
        useGet
    } = useConnections(service);        

    const getAllApplications = async () => {
        setData(await useGet());
    }

    useEffect(() => {
        getAllApplications();
    }, []); // Llamar a la función getAllApplications al montar el componente

    return (
        <div>       
            <h4>Aplicaciones</h4>
            <p>Lista de aplicaciones</p>

        <table style={{ border: '1px solid black', borderCollapse: 'collapse'}}>
          <thead>
            <tr className='tabla'>
              <th>Id</th>
              <th>Compañía</th>
              <th>Aplicación</th>
              <th>Activa</th>
              <th>Fecha de creación</th>
              <th></th>
            </tr>
          </thead>
          <tbody>

            { 
                data.map((item) => {
                  return (
                  <tr key={item.appId}>
                    <td className='tds'>{item.appId}</td>
                    <td className='tds'>{item.companyId}</td>
                    <td className='tds' style={{ textAlign: 'left'}}>{item.appName}</td>
                    <td className='tds' style={{ textAlign: 'center'}}>{item.isActive == true ? "Sí" : "No"}</td>
                    <td className='tds' style={{ textAlign: 'left'}}>{item.creationDate}</td>
                    <td className='tds'><button onClick={() => {getDetail(item.appId)}} type="button" className="counter">Editar</button></td>
                  </tr>
                  )
                })
            }

          </tbody>
        </table>


        </div>
    );
}
export default Applications;