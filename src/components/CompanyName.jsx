import { useEffect, useState } from "react"; 

import { useConnections } from "../hooks/useConnections";
import { crudService2 } from "../services/crudService2";

const CompanyName = ({ id }) => {

    const [nameCompany, setNameCompany] = useState("");

    const service = crudService2("api/v1/JobApplication/");
    const {
        loading,
        error,
        useGetRoute
    } = useConnections(service);     
    
    const getRecordById = async (id) => {
        let result = await useGetRoute(id);
        setNameCompany(result.company);
    }

    useEffect(() => {
        getRecordById(id);
    },[]);    
    
    return (<>
        {nameCompany}
    </>)
}
export default CompanyName;