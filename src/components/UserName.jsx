import { useConnections } from "../hooks/useConnections";
import { crudService } from "../services/crudService";

import { jwtDecode } from 'jwt-decode'

const UserName = () => {

    const service = crudService("api/Auth/Login");
    const {
        loading,
        error,
        useGet
    } = useConnections(service);     
    
    let loc = localStorage.getItem("token");
    const decoded = jwtDecode(loc);
    
    return (<>
    Bienvenido: {decoded.FullName}
    </>)
}
export default UserName;