import { useState } from "react";

export function useConnections(service){
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleError = (err) => {
        const mensaje = err?.message || "Error desconocido";
        setError(mensaje);
        //console.error(err);
        throw err;
    };    

    const useGet = async (params) => {
        try {
            setLoading(true);
            setError(null);
            const result = await service.get(params);
            if (!result.success) {
                setError(result.message);
            } else {
                setData(result);
            }
            return result;
        } catch (err) {
            return handleError(err);
        } finally {
            setLoading(false);
        }
    };
    const useGetRoute = async (id) => {
        try {
            setLoading(true);
            setError(null);
            const result = await service.getRoute(id);
            if (!result.success) {
                setError(result.message);
            } else {
                setData(result);
            }
            return result;
        } catch (err) {
            return handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const usePost = async (params) =>  {
        try {
            setLoading(true);
            setError(null);

            const result = await service.post(params);
            if (!result.success) {
                setError(result.message);
            } else {    
                setData(result);
            }
            return result;

        } catch (err) {
            return handleError(err);
        } finally {
            setLoading(false);
        }
    
    };

    const usePut = async (params) =>  {
        try {
            setLoading(true);
            setError(null); 
             
            const result = await service.put(params);
            if (!result.success) {
                setError(result.message);
            } else {
                setData(result);
            }            
            return result;
        } catch (err) {
            return handleError(err);
        } finally {
            setLoading(false);
        }
    };

    return {
        data,
        loading,
        error,
        useGet,
        useGetRoute,
        usePost,
        usePut
    }

}