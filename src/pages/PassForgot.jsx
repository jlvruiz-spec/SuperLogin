import Input from "../components/Input";

const PassForgot = () => {
    return (
        <div>
            <h1>Recuperar contraseña</h1>
            <p>Ingrese su correo electrónico para recuperar su contraseña.</p>  

            <form>
                <Input id="email" label="Correo electrónico" type="email" />
                <button type="submit">Enviar</button>       

            </form>
        </div>
    );
}
export default PassForgot;