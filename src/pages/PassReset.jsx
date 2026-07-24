import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import Input from "../components/Input";

import { useConnections } from "../hooks/useConnections";
import { crudService } from "../services/crudService";

const PassReset = () => {

    const navigate = useNavigate();

    const service = crudService("api/Auth/reset-password");
    const {
        loading,
        error,
        usePost
    } = useConnections(service);  

    const onSubmit = async (e) => {
        e.preventDefault(); 

        const newPass = document.getElementById("newPass").value;
    
        let result = await usePost({"token": "", "newPassword": newPass}); // Llamar a la función usePost para realizar la solicitud de inicio de sesión
        navigate("/home"); // Redirige a la página de inicio después de iniciar sesión
    }



    return (
        <div>
            <h1>Cambiar contraseña</h1>
            <p>Ingrese la nueva contraseña para actualizar su acceso.</p>  

            {error && <div style={{ color: 'red', backgroundColor: '#f3cec8', padding: '5px'}}>{error}</div>}

            <form onSubmit={onSubmit}>
                <Input id="newPass" label="Nueva contraseña" type="text" />
                <button type="submit">Enviar</button>       

            </form>
        </div>
    );
}
export default PassReset;