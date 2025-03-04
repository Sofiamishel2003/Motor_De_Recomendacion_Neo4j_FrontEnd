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
async function generarVisualizacion() {
    const f_label = document.getElementById("f_label").value;
    const f_val = document.getElementById("f_val").value;
    const t_label = document.getElementById("t_label").value;
    const t_val = document.getElementById("t_val").value;
    const rel = document.getElementById("rel").value;
    const limit = document.getElementById("limit").value;
    
    const requestData = { f_label, f_val, t_label, t_val, rel, limit };

    try {
        const response = await fetch("https://motor-de-recomendacion-neo4j-sofia-velasquezs-projects.vercel.app/vis-simple", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error("Error en la respuesta del servidor");
        }

        // Crear un objeto Blob para la imagen
        const imageBlob = await response.blob();
        const imageURL = URL.createObjectURL(imageBlob);
        
        console.log("Imagen generada en:", imageURL); // Depuración en consola

        const imgElement = document.getElementById("graphImage");
        
        // Limpiar el blob anterior para liberar memoria
        if (imgElement.src) {
            URL.revokeObjectURL(imgElement.src);
        }

        // Asignar la nueva imagen generada
        imgElement.src = imageURL;
        imgElement.classList.remove("d-none");
        imgElement.style.display = "block"; // Asegurar que se muestre

    } catch (error) {
        console.error("Error al obtener la visualización:", error);
        alert("Error al obtener la visualización. Revisa la consola para más detalles.");
    }
}

// **Asigna la función al objeto window**
window.generarVisualizacion = generarVisualizacion;

async function generarVisualizacionFiltro() {
    const labels = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
                        .map(checkbox => checkbox.value);

    const limit = document.getElementById("limit").value;
    const showProps = document.getElementById("show_props").checked;

    let conditions = [];
    document.querySelectorAll(".condition-row").forEach(row => {
        const prop = row.querySelector(".cond-prop").value;
        const op = row.querySelector(".cond-op").value;
        const val = row.querySelector(".cond-val").value;
        if (prop && op && val) {
            conditions.push(`${prop},${op},${val}`);
        }
    });

    const requestData = { labels, limit, rels: labels, cond: conditions, show_props: showProps };

    try {
        const response = await fetch(`${API_BASE_URL}/vis-filter`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error("Error en la respuesta del servidor");
        }

        const imageBlob = await response.blob();
        const imageURL = URL.createObjectURL(imageBlob);
        
        const imgElement = document.getElementById("graphImage");
        if (imgElement.src) {
            URL.revokeObjectURL(imgElement.src);
        }

        imgElement.src = imageURL;
        imgElement.classList.remove("d-none");
        imgElement.style.display = "block";

    } catch (error) {
        console.error("Error al obtener la visualización:", error);
        alert("Error al obtener la visualización. Revisa la consola para más detalles.");
    }
}

window.generarVisualizacionFiltro = generarVisualizacionFiltro;


export { agregarPropiedad, actualizarPropiedad, eliminarPropiedad, generarVisualizacion ,generarVisualizacionFiltro};
