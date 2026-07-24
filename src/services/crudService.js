//import Tokens from "./Tokens";

const BASE_URL = "https://auth1.runasp.net/";

const getHeaders = async () => {
    
    //let token = localStorage.getItem("token");
    /*
    if (!token) {
        // no hay token → obtener uno nuevo
        const tokens = new Tokens();
        token = await tokens.tokenCRM();
    }
    */ 
    
    return {
        "Content-Type": "application/json",
        //...(token && { Authorization: `Bearer ${token}` })
    };
};

const request = async (endpoint, options = {}) => {
    const headers = options.headers || {};

    // Agregar el token si está disponible
    //const token = localStorage.getItem("token");
    /*if (token) {
        headers.Authorization = `Bearer ${localStorage.getItem("tokenCRM")}`;
    }*/
    
    try {
        const response = await fetch(`${endpoint}`, {
            ...options,
            headers,
        });

        // Si el token expiró (401), intentar renovarlo y reintentar la solicitud
        if (response.status === 400){
            throw Error('Datos incorrectos o inexistentes en el cliente, no se procesarán los datos');
        }

        if (response.status === 401) {
            //console.warn('Clave o contraseña erronea, intente de nuevo');
            throw Error('Clave o contraseña erronea, intente de nuevo');

            //const tokens = new Tokens();
            //await tokens.tokenCRM();

            //Reintentar la solicitud original con el nuevo token
            headers.Authorization = 'Bearer ' + localStorage.getItem('token');
            const retryResponse = await fetch(`${endpoint}`, {
                ...options,
                headers,
            });

            if (!retryResponse.ok) {
                throw Error(`${retryResponse.status} ${retryResponse.statusText } ${retryResponse.url.substring(retryResponse.url.lastIndexOf("/"))}`);
            }

            return await retryResponse.json();
        }

        if (response.status === 404){
            throw Error('No se encontraron datos al solicitarlos');
        }

        if (!response.ok) {
            throw Error(`${response.status} ${response.statusText } ${response.url.substring(response.url.lastIndexOf("/"))}`);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}

// función que procesa los datos de una api y devuelve un objeto con métodos para interactuar con esa api
export const crudService = (endpoint) => {

    const URL = `${BASE_URL}${endpoint}`;

    return {
        
        async get(params = {}) {
            const queryString = new URLSearchParams(params).toString();
            const url = queryString ? `${URL}${queryString}` : URL;
            return request(url, { 
                method: 'GET',
                headers: await getHeaders() 
            });
        },
        async getRoute(id) {
            const url = `${URL}${id}`;
            return request(url, { 
                method: 'GET',
                headers: await getHeaders()
            });
        },
        async post(params = {}) {
            return request(URL, {
                method: 'POST',
                headers: await getHeaders(),
                body: JSON.stringify(params),
            });
        },
        async put(params = {}){
            return request(URL + "/" + params.idcosa, {
                method: 'PUT',
                headers: await getHeaders(),
                body: JSON.stringify(params),
            });
        },  
        async delete(endpoint) {
            return request(endpoint, { 
                method: 'DELETE' ,
                headers: await getHeaders()
            });
        }                

    }
};

export default crudService();