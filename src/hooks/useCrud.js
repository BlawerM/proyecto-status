//El crud en memoria, usando fetch para que lleguen sus datos

import { useEffect, useState } from "react";

export function useCrud(url) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const control = new AbortController();

        async function load() {
            try {
                setLoading(true);
                setError(null);

                const res = await fetch(url, { signal: control.signal});
                const data = await res.json();

                if (!res.ok) throw new Error(data.error || `Error al cargar ${url} (${res.status})`)
                
                const lista = Array.isArray(data) ? data : (data.datos || []);

                setItems(lista.map((item) => ({
                    ...item, id: item._id || item.id
                })))

            } catch (e) {
                if (e.name !== 'AbortError') setError(e.message);
            }finally{
                if (!control.signal.aborted) setLoading(false);
            }
        }
        load();
        return () => control.abort();
    }, [url])

    //POST de tasks
    const create = async (newItem) => {
        try {
            setError(null);
            const res =await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(newItem),
            });
            const data = await res.json();

            if(!res.ok) throw new Error(data.error || 'Error al crear la tarea');

            const creado = { ...data, id: data._id || data.id};
            setItems((prev) => [...prev, creado]);
            return creado.id;
        } catch (e) {
            setError(e.message);
            throw e;
        }
    };

    const update = async (id, dataToUpdate) => {
        try {
            setError(null);
            const baseUrl = url.split('?')[0];
            const res = await fetch(`${baseUrl}/${id}`,{
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(dataToUpdate),
            });
            const data = await res.json();

            if (!res.ok) throw new Error (data.error || 'Error al actualizar la tarea');

            const actualizado = {...data, id: data._id || data.id};
            setItems((prev) => prev.map((item) => (item.id === id ? actualizado : item))
            );
            return actualizado;
        } catch (e) {
            setError(e.message);
            throw e;
        }
    };

    const remove = async (id) => {
        try {
            setError(null);
            const baseUrl = url.split('?')[0];
            const res = await fetch(`${baseUrl}/${id}`, {
                method: 'DELETE',
            });
            const data = await res.json();

            if(!res.ok) throw new Error(data.error || 'Error al eliminar la tarea');

            setItems((prev) => prev.filter((item) => item.id !== id));
        }catch (e) {
            setError(e.message);
            throw e;
        }
    };

    return { items, create, update, remove, loading, error};
}