//import Tokens from "./Tokens";

const BASE_URL = "https://menjccf.runasp.net/";

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
        //...(token && { Authorization: 'Bearer ' + localStorage.getItem("token") })
    };
};

const request = async (endpoint, options = {}) => {
    const headers = options.headers || {};
    
    try {
        headers.Authorization = 'Bearer ' + localStorage.getItem('token');
        const response = await fetch(`${endpoint}`, {
            ...options,
            headers,
        });

        // Para cuando no hay una respuesta de la api pero el proceso se ejecutó bien
        if (response.status === 204){
            return { success: true }; // 👈 respuesta manual
        }

        // Token expiró (401), intentar renovarlo y reintentar la solicitud
        if (response.status === 401) {
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
        
        // Página no encontrada
        if (response.status === 404){
            throw Error('No se encontró la página');
        }

        // respuesta no fué exitosa
        if (!response.ok) {
            throw Error(`${response.status} ${response.statusText } ${response.url.substring(response.url.lastIndexOf("/"))}`);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}

// función que procesa los datos de una api y devuelve un objeto con métodos para interactuar con esa api
export const crudService3 = (endpoint) => {

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
            console.log("->",params)
            return request(URL + params.jobApplicationId, {
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

export default crudService3();