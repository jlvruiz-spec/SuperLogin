import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import Input from "../components/Input";

import { useConnections } from "../hooks/useConnections";
import { crudService } from "../services/crudService";

const Login = () => {

    const navigate = useNavigate();

    const service = crudService("api/Auth/Login");
    const {
        loading,
        error,
        usePost
    } = useConnections(service);      

    // Evaluar el acceso

    const onSubmit = async (e) => {
        e.preventDefault(); 

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
    
        let result = await usePost({"user": username, "password": password, "applicationId": 1}); // Llamar a la función usePost para realizar la solicitud de inicio de sesión
        if (!result) {
            <div>{result.message ?? "Error"}</div>;
            return;
        }
        localStorage.setItem('token', result.token);
        //navigate("/home"); // Redirige a la página de inicio después de iniciar sesión
        navigate("/jobapplication"); // Redirige a la página de inicio después de iniciar sesión
    }


    return (
        <div>
            <h1>Login</h1>
            
            {error && <div style={{ color: 'red', backgroundColor: '#f3cec8', padding: '5px'}}>{error}</div>}

            {loading && <div style={{ color: 'orange', backgroundColor: '#eee2d1', padding: '5px'}}>Validando acceso, espere</div> }

            <form onSubmit={onSubmit}>
                <Input id="username" label="Clave" />
                <Input id="password" label="Contraseña" type="password" />
                <button type="submit">Acceder</button>
            </form>
            {/* <Link to="/passforgot">Recuperar contraseña</Link> | <Link to="/passreset">Cambiar contraseña</Link> */}

        </div>
    );
}
export default Login;