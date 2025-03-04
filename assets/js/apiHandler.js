const API_BASE_URL = "http://127.0.0.1:8000"; // Reemplaza con la URL de vercel

async function agregarPropiedad(label, ids, propiedades, multiple = false) {
    const endpoint = multiple ? `/nodes/${label}/add_properties` : "/node/add-properties";
    const payload = multiple ? { label, node_ids: ids, properties: propiedades } : { label, id: ids[0], properties: propiedades };

    return await realizarSolicitud("PUT", endpoint, payload);
}

async function actualizarPropiedad(label, ids, propiedades, multiple = false) {
    const endpoint = multiple ? `/nodes/${label}/update_properties` : "/node/update-properties";
    const payload = multiple ? { label, node_ids: ids, properties: propiedades } : { label, id: ids[0], properties: propiedades };

    return await realizarSolicitud("PUT", endpoint, payload);
}

async function eliminarPropiedad(label, ids, propiedades, multiple = false) {
    const endpoint = multiple ? `/nodes/${label}/delete_properties` : "/node/delete-properties";
    const payload = multiple ? { label, node_ids: ids, properties: propiedades } : { label, id: ids[0], properties: propiedades };

    return await realizarSolicitud("DELETE", endpoint, payload);
}

async function realizarSolicitud(metodo, endpoint, datos) {
    try {
        const respuesta = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: metodo,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        });

        const resultado = await respuesta.json();
        if (!respuesta.ok) {
            throw new Error(resultado.detail || "Error en la solicitud");
        }
        return resultado;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

export { agregarPropiedad, actualizarPropiedad, eliminarPropiedad };
