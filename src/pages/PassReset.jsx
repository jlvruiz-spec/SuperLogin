import Input from "../components/Input";

const PassReset = () => {
    return (
        <div>
            <h1>Cambiar contraseña</h1>
            <p>Ingrese su correo electrónico para cambiar su contraseña.</p>  

            <form>
                <Input id="email" label="Correo electrónico" type="email" />
                <button type="submit">Enviar</button>       

            </form>
        </div>
    );
}
export default PassReset;