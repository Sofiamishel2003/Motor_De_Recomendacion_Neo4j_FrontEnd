import { agregarPropiedad, actualizarPropiedad, eliminarPropiedad } from "./apiHandler.js";

document.addEventListener("DOMContentLoaded", function () {
    const forms = {
        add: document.getElementById("addPropertyForm"),
        edit: document.getElementById("editPropertyForm"),
        delete: document.getElementById("deletePropertyForm")
    };

    function showToast(message, isSuccess = true) {
        const toast = document.createElement("div");
        toast.className = `toast-message ${isSuccess ? 'success' : 'error'}`;
        toast.innerText = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
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
                
                const properties = {};
                form.querySelectorAll(".property-key").forEach((keyField, index) => {
                    const key = keyField.value;
                    const value = form.querySelectorAll(".property-value")[index]?.value;
                    if (key && value) properties[key] = value;
                });
                
                try {
                    let response;
                    if (action === "add") {
                        response = await agregarPropiedad(label, nodeIds, properties, isMultiNode);
                    } else if (action === "edit") {
                        response = await actualizarPropiedad(label, nodeIds, properties, isMultiNode);
                    } else if (action === "delete") {
                        response = await eliminarPropiedad(label, nodeIds, Object.keys(properties), isMultiNode);
                    }
                    
                    console.log("Respuesta de la API:", response);
                    showToast("Operación exitosa", true);
                    form.reset();
                } catch (error) {
                    console.error("Error en la operación:", error);
                    showToast(`Error: ${error.message}`, false);
                }
            });
        }
    });
});
