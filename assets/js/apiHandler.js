const API_BASE_URL = "https://motor-de-recomendacion-neo4j-sofia-velasquezs-projects.vercel.app"; 

async function agregarPropiedad(label, ids, propiedades, multiple = false) {
    const endpoint = multiple ? `/nodes/${label}/add_properties` : "/node/add-properties";
    const metodo = multiple ? "POST" : "PUT"; // Corrección aquí
    const payload = multiple 
        ? { node_ids: ids, properties: propiedades } 
        : { label, id: ids[0], properties: propiedades };

    return await realizarSolicitud(metodo, endpoint, payload);
}

async function actualizarPropiedad(label, ids, propiedades, multiple = false) {
    const endpoint = multiple ? `/nodes/${label}/update_properties` : "/node/update-properties";
    const payload = multiple ? { label, node_ids: ids, properties: propiedades } : { label, id: ids[0], properties: propiedades };

    return await realizarSolicitud("PUT", endpoint, payload);
}

async function eliminarPropiedad(label, ids, propiedades, multiple = false) {
    if (propiedades.length === 0) {
        alert("❌ Debes seleccionar al menos una propiedad para eliminar.");
        return;
    }

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
