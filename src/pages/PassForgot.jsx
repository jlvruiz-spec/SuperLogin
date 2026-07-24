import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import Input from "../components/Input";

import { useConnections } from "../hooks/useConnections";
import { crudService } from "../services/crudService";

const PassForgot = () => {

    const navigate = useNavigate();

    const service = crudService("api/Auth/forgot-password");
    const {
        loading,
        error,
        usePost
    } = useConnections(service);  

    const onSubmit = async (e) => {
        e.preventDefault(); 

        const email = document.getElementById("email").value;
    
        let result = await usePost({"emailOrUsername": email, "appId": 1}); // Llamar a la función usePost para realizar la solicitud de inicio de sesión
        navigate("/home"); // Redirige a la página de inicio después de iniciar sesión
    }


    return (
        <div>
            <h1>Recuperar contraseña</h1>
            <p>Ingrese su correo electrónico para recuperar su contraseña. Al recuperarse lo enviará de nuevo a la pantalla de inicio</p>  

            {error && <div style={{ color: 'red', backgroundColor: '#f3cec8', padding: '5px'}}>{error}</div>}

            <form onSubmit={onSubmit}>
                <Input id="email" label="Correo electrónico" type="email" />
                <button type="submit">Enviar</button>       

            </form>
        </div>
    );
}
export default PassForgot;