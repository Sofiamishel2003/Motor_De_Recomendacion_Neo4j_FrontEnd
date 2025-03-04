import { agregarPropiedad, actualizarPropiedad, eliminarPropiedad } from "./apiHandler.js";

document.addEventListener("DOMContentLoaded", function () {
    const forms = {
        add: document.getElementById("addPropertyForm"),
        edit: document.getElementById("editPropertyForm"),
        delete: document.getElementById("deletePropertyForm")
    };

    function showAlert(message, isSuccess = true) {
        alert(`${isSuccess ? '✅ Éxito:' : '❌ Error:'} ${message}`);
    }

    Object.keys(forms).forEach(action => {
        if (forms[action]) {
            forms[action].addEventListener("submit", async function (event) {
                event.preventDefault();
                
                const form = event.target;
                const label = form.querySelector("#nodeType").value;
                const isMultiNode = form.querySelector("#multiNode")?.checked;
                const nodeIds = isMultiNode 
                    ? form.querySelector("#nodeIds").value.split(",").map(id => parseInt(id.trim()))
                    : [parseInt(form.querySelector("#nodeId").value)];

                let properties;
                if (action === "delete") {
                    // Extraer solo las claves de propiedades a eliminar
                    properties = Array.from(form.querySelectorAll(".property-key")).map(select => select.value);
                } else {
                    // Para "add" y "edit", mantener pares clave-valor
                    properties = {};
                    form.querySelectorAll(".property-key").forEach((keyField, index) => {
                        const key = keyField.value;
                        const value = form.querySelectorAll(".property-value")[index]?.value;
                        if (key && value) properties[key] = value;
                    });
                }

                // Verificar que hay al menos una propiedad en caso de eliminación
                if (action === "delete" && properties.length === 0) {
                    showAlert("❌ Debes seleccionar al menos una propiedad para eliminar.", false);
                    return;
                }

                try {
                    let response;
                    if (action === "add") {
                        response = await agregarPropiedad(label, nodeIds, properties, isMultiNode);
                    } else if (action === "edit") {
                        response = await actualizarPropiedad(label, nodeIds, properties, isMultiNode);
                    } else if (action === "delete") {
                        response = await eliminarPropiedad(label, nodeIds, properties, isMultiNode);
                    }
                    
                    console.log("Respuesta de la API:", response);
                    showAlert("Operación realizada con éxito", true);
                    form.reset();
                } catch (error) {
                    console.error("Error en la operación:", error);
                    showAlert(error.message, false);
                }
            });
        }
    });
});
