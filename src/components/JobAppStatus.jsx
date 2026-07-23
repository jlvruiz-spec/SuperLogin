
import { useState, useEffect } from "react";

import { useConnections } from "../hooks/useConnections";
import { crudService2 } from "../services/crudService2";

const JobAppStatus = ({ status, onChange }) => {
 
    const [data, setData] = useState([]);
    const [selectedName, setSelectedName] = useState("");

    const service = crudService2("api/v1/JobApplicationStatus");
    const {
        loading,
        error,
        useGet
    } = useConnections(service);        

    const getAllJobApplicationStatus = async () => {
        setData(await useGet());
    }

    const handleChange = (e) => {
        const id = e.target.value;
        const name = e.target.options[e.target.selectedIndex].text;

        setSelectedName(name);

        // 👇 notifica al padre
        if (onChange) {
            onChange({ name });
        }
    };    

    useEffect(() => {
        getAllJobApplicationStatus();
    }, []);    
    
    return (
        <>
        {loading && <div style={{ color: 'orange', backgroundColor: '#eee2d1', padding: '5px'}}>Cargando estados, espere</div> }
        <select name="jobApplicationStatusId" onChange={handleChange}>
            
            { 
                data.map((item) => {
                  return (   
                    <option 
                        key={item.jobApplicationStatusId} 
                        value={item.jobApplicationStatusId} 
                        selected={status === item.jobApplicationStatusId}
                        //defaultValue={status === item.jobApplicationStatusId}
                    >{item.jobApplicationStatusDescription}</option>
                  )
                })
            }
        </select>
        </>
    )
}
export default JobAppStatus;