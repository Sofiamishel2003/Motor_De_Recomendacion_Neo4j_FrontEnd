/**
* Template Name: Sailor
* Template URL: https://bootstrapmade.com/sailor-free-bootstrap-theme/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Auto generate the carousel indicators
   */
  document.querySelectorAll('.carousel-indicators').forEach((carouselIndicator) => {
    carouselIndicator.closest('.carousel').querySelectorAll('.carousel-item').forEach((carouselItem, index) => {
      if (index === 0) {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}" class="active"></li>`;
      } else {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}"></li>`;
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  document.addEventListener("DOMContentLoaded", function () {

    const validRelationships = {
      "Usuario": { 
          relationships: ["VIO", "CALIFICO", "RECOMENDO","SIGUE","ADMIRA"], 
          validTargets: ["Pelicula", "Serie", "Genero","Director", "Actor"] 
      },
      "Pelicula": { 
          relationships: ["PERTENECE_A", "DIRIGIDA_POR"], 
          validTargets: ["Genero", "Director"] 
      },
      "Serie": { 
          relationships: ["TIENE_TEMATICA", "PRODUCIDA_POR"], 
          validTargets: ["Genero", "Director"] 
      },
      "Actor": { 
          relationships: ["PARTICIPO_EN"], 
          validTargets: ["Pelicula", "Serie"] 
      },
      "Genero": { 
          relationships: [], 
          validTargets: [] 
      },
      "Director": { 
          relationships: [], 
          validTargets: [] 
      }
  };

  const fromDropdown = document.getElementById("from-node");
  const toDropdown = document.getElementById("to-node");
  const relationDropdown = document.getElementById("relationship-type");

  fromDropdown.addEventListener("change", function () {
      const selectedFromNode = fromDropdown.value;
      console.log("Selected From Node:", selectedFromNode);
      
      // Reset the relationship and to-node dropdowns
      relationDropdown.innerHTML = '<option value="">Select Relationship</option>';
      toDropdown.innerHTML = '<option value="">Select To Node Type</option>';
      toDropdown.disabled = true;
      relationDropdown.disabled = true;

      if (validRelationships[selectedFromNode]) {
          // Populate valid relationships
          console.log("there are relationships: ",validRelationships[selectedFromNode]);
          validRelationships[selectedFromNode].relationships.forEach(rel => {
              let option = document.createElement("option");
              option.value = rel;
              option.textContent = rel;
              relationDropdown.appendChild(option);
          });

          // Enable relationship dropdown if there are valid relationships
          if (validRelationships[selectedFromNode].relationships.length > 0) {
            console.log("Enabled toDropdown with options:", toDropdown.innerHTML);
              relationDropdown.disabled = false;
          }

          // Populate valid target node types
          validRelationships[selectedFromNode].validTargets.forEach(target => {
              let option = document.createElement("option");
              option.value = target;
              option.textContent = target;
              toDropdown.appendChild(option);
          });

          // Enable to-node dropdown if there are valid targets
          if (validRelationships[selectedFromNode].validTargets.length > 0) {
              toDropdown.disabled = false;
          }
      }
      else{console.log("No valid relationships found for", selectedFromNode);}
  });
    // Manejar búsqueda de nodos al presionar Enter
    document.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
              let inputField = event.target;
              console.log("Detectado input:", inputField);
              if (!inputField.classList.contains("input-search")) return;
                event.preventDefault();
                let nodeId = inputField.value.trim();
                
                if (!nodeId) return;

                
                let isFromField = inputField.placeholder.includes("From"); // Check if input is "from" or "to"
                console.log(inputField);
                let selectedLabel;
                if(isFromField){
                  selectedLabel=fromDropdown.value;
                }
                else{
                  selectedLabel=toDropdown.value;
                }

                if (!selectedLabel) {
                    console.error("Error: No label selected for node search.");
                    return;
                }

                fetch(`http://127.0.0.1:8000/searchidlabel/${nodeId}/${selectedLabel}`)
                    .then(response => response.json())
                    .then(data => {
                        console.log("Parsed JSON response:", data);
                        let label = data.labels ? data.labels.join(", ") : "No label";
                        let idText = data.error ? "ID: Not found" : `ID: ${data.id}`;
                        let typeText = data.error ? "Type: Unknown" : `Type: ${label}`;
                        updatePricingItem(inputField, idText, typeText);
                    })
                    .catch(error => console.error("Error fetching node:", error));

            }
        
    });

    // Configurar manejadores de propiedades dinámicas
    function setupPropertyHandler(containerSelector, addButtonSelector) {
        let propertiesContainer = document.querySelector(containerSelector);
        let addButton = document.querySelector(addButtonSelector);

        if (propertiesContainer && addButton) {
            addButton.addEventListener("click", function () {
                let propertyDiv = document.createElement("div");
                propertyDiv.classList.add("property");

                let keyInput = document.createElement("input");
                keyInput.type = "text";
                keyInput.classList.add("property-key");
                keyInput.placeholder = "Property Key";

                let valueInput = document.createElement("input");
                valueInput.type = "text";
                valueInput.classList.add("property-value");
                valueInput.placeholder = "Property Value";

                let removeButton = document.createElement("button");
                removeButton.textContent = "-";
                removeButton.classList.add("remove-property");
                removeButton.addEventListener("click", () => propertiesContainer.removeChild(propertyDiv));

                propertyDiv.append(keyInput, valueInput, removeButton);
                propertiesContainer.appendChild(propertyDiv);
            });
        }
    }

    setupPropertyHandler(".properties-container", ".add-property");
    setupPropertyHandler(".add-properties-container .properties-container", ".add-properties-container .add-property");

    // Obtener datos de los elementos de precio
    function getPricingData() {
      let pricingItems = document.querySelectorAll(".pricing-item");
      console.log(pricingItems);
      if (pricingItems.length < 2) {
          alert("Not enough pricing items found.");
          return null;
      }
  
      function extractData(item) {
          let idText = item.querySelector(".pricing-title")?.textContent || "";
          let typeText = item.querySelector(".pricing-type")?.textContent || "";
          return {
              id: parseInt(idText.replace("ID: ", "").trim()) || null,
              label: typeText.replace("Type: ", "").trim() || "Unknown"
          };
      }
  
      let fromData = extractData(pricingItems[0]);
      let toData = extractData(pricingItems[1]);
  
      if (!fromData.id || !toData.id) {
          alert("Missing node IDs.");
          return null;
      }
  
      return {
          from_label: fromData.label,
          from_id: fromData.id,
          to_label: toData.label,
          to_id: toData.id
      };
  }
  

    // Recopilar propiedades desde un contenedor
    function collectProperties(containerSelector) {
        let properties = {};
        document.querySelectorAll(`${containerSelector} .property`).forEach(propDiv => {
            let key = propDiv.querySelector(".property-key")?.value.trim();
            let value = propDiv.querySelector(".property-value")?.value.trim();
            if (key && value) {
                properties[key] = isNaN(value) ? value : parseFloat(value);
            }
        });
        return properties;
    }

    // Función genérica para enviar solicitudes
    function sendRequest(url, method, body, successMessage) {
      if (!body || Object.keys(body).length === 0) {
          alert("No data to send.");
          return;
      }
      console.log(JSON.stringify(body));
      fetch(url, {
          method: method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
      })
      .then(response => response.json())
      .then(data => {
          console.log("Response:", data);
          alert(data.message || successMessage);
      })
      .catch(error => console.error("Error:", error));
  }
  

    // Manejar creación de relaciones
    document.querySelector(".submit-relation")?.addEventListener("click", function () {
        let pricingData = getPricingData();
        let relationType = relationDropdown.value;
        console.log("relation type",relationType);
        console.log("pricing data:",pricingData);
        if (!pricingData || !relationType) {
            alert("Please make sure all fields are filled.");
            return;
        }

        sendRequest("http://127.0.0.1:8000/relation/create", "POST", {
            from_label: pricingData.from_label,
            from_id: pricingData.from_id,
            to_label: pricingData.to_label,
            to_id: pricingData.to_id,
            relation_type: relationType,
            properties: collectProperties(".properties-container")
        }, "Relation created successfully!");
    });

    // Manejar actualización de propiedades
    document.querySelector(".submit-add-properties")?.addEventListener("click", function () {
        let pricingData = getPricingData();
        console.log("pricing data: ",pricingData);
        let relationType = relationDropdown.value;
        console.log("relation type",relationType);
        if (!pricingData || !relationType) {
            alert("Please make sure all fields are filled.");
            return;
        }

        sendRequest("http://127.0.0.1:8000/relation/add-properties", "PUT", {
            relation_type: relationType,
            from_label: pricingData.from_label,
            from_id: pricingData.from_id,
            to_label: pricingData.to_label,
            to_id: pricingData.to_id,
            properties: collectProperties(".add-properties-container .properties-container")
        }, "Properties added successfully!");
    });

    // Manejar actualización de relaciones existentes
    document.querySelector(".submit-update-properties")?.addEventListener("click", function () {
      let pricingData = getPricingData();
      console.log("pricing data: ",pricingData);
      let relationType = relationDropdown.value;
      console.log("relation type",relationType);
      if (!pricingData || !relationType) {
          alert("Please make sure all fields are filled.");
          return;
      }
      console.log(toIds);
      if (toIds.length > 0) {
          toIds = toIds.map(item => parseInt(item.value)).filter(num => !isNaN(num));
          toIds.push(pricingData.to_id);
          pricingData.to_id = toIds;
      }
      
      if (fromIds.length > 0) {
          fromIds = fromIds.map(item => parseInt(item.value)).filter(num => !isNaN(num));
          fromIds.push(pricingData.from_id);
          pricingData.from_id = fromIds;
      }
    
      let properties = collectProperties(".update-properties-container .properties-container");
      console.log(toIds);
      let isMultiple = Array.isArray(pricingData.from_id) || Array.isArray(pricingData.to_id);
      let url = isMultiple 
          ? "http://127.0.0.1:8000/relations/update-multiple" 
          : "http://127.0.0.1:8000/relation/update-properties";
  
      let body = {
          relation_type: relationType,
          from_label: pricingData.from_label,
          to_label: pricingData.to_label,
          properties: properties
      };
  
      if (isMultiple) {
          console.log("ismultiple");
          body.from_ids = Array.isArray(pricingData.from_id) ? pricingData.from_id : [pricingData.from_id];
          body.to_ids = Array.isArray(pricingData.to_id) ? pricingData.to_id : [pricingData.to_id];
      } else {
          body.from_id = pricingData.from_id;
          body.to_id = pricingData.to_id;
      }
  
      sendRequest(url, "PUT", body, "Properties updated successfully!");
  });

  // Arrays para almacenar los IDs de los nodos seleccionados
let fromIds = [];
let toIds = [];


    document.getElementById("add-from").addEventListener("click", function () {
        addPricingItem("from-container", "Enter From Id", "from-node", fromIds);
    });

    document.getElementById("add-to").addEventListener("click", function () {
        addPricingItem("to-container", "Enter To Id", "to-node", toIds);
    });

    function addPricingItem(containerId, placeholderText, dropdownId, idArray) {
        const container = document.getElementById(containerId);
        const newItem = document.createElement("div");
        newItem.classList.add("pricing-item");

        // Generate unique input ID
        const inputId = `input-${Date.now()}`;
        newItem.innerHTML = `
            <div class="search-box">
                <button class="btn-search"><i class="fas fa-search"></i></button>
                <input type="text" id="${inputId}" class="input-search" placeholder="${placeholderText}">
                <div class="search-results"></div>
            </div>
            <h4 class="pricing-title">ID: N/A</h4>
            <p class="pricing-type">Type: N/A</p>
            <button class="remove-item">Remove</button>
        `;

        container.appendChild(newItem);

        // Capture user input and update the ID list
        const inputField = newItem.querySelector(`#${inputId}`);
        inputField.addEventListener("input", function () {
            updateIdArray(idArray, inputField.value, inputId);
        });

        // Remove button functionality
        newItem.querySelector(".remove-item").addEventListener("click", function () {
            removeFromIdArray(idArray, inputId);
            newItem.remove();
        });
    }

    function updateIdArray(idArray, newValue, inputId) {
        const index = idArray.findIndex(item => item.id === inputId);

        if (index === -1) {
            // Add new entry
            idArray.push({ id: inputId, value: newValue });
        } else {
            // Update existing entry
            idArray[index].value = newValue;
        }

        console.log("From IDs:", fromIds.map(item => item.value));
        console.log("To IDs:", toIds.map(item => item.value));
    }

    function removeFromIdArray(idArray, inputId) {
        const index = idArray.findIndex(item => item.id === inputId);
        if (index !== -1) {
            idArray.splice(index, 1);
        }

        console.log("From IDs after removal:", fromIds.map(item => item.value));
        console.log("To IDs after removal:", toIds.map(item => item.value));
    }
});


function updatePricingItem(inputElement, idText, typeText) {
    let pricingItem = inputElement.closest(".pricing-item");  // Find the closest pricing-item
    if (!pricingItem) return;

    let pricingTitle = pricingItem.querySelector(".pricing-title");
    let pricingType = pricingItem.querySelector(".pricing-type");

    if (pricingTitle) pricingTitle.textContent = idText;
    if (pricingType) pricingType.textContent = typeText;
}
})();
document.addEventListener("DOMContentLoaded", function () {
  const nodeTypeSelect = document.getElementById("nodeType");
  const multiNodeCheckbox = document.getElementById("multiNode");
  const nodeIdsContainer = document.getElementById("nodeIdsContainer");
  const addPropertyBtn = document.getElementById("addPropertyBtn");
  const propertiesContainer = document.getElementById("propertiesContainer");

  // Detectar el tipo de formulario (Agregar, Editar o Eliminar)
  const isDeleteForm = document.body.classList.contains("delete-properties-page");

  const nodeProperties = {
      Usuario: ["nombre", "edad", "pais", "suscripcion", "ultima_fecha_vista", "dispositivo", "activo", "intereses"],
      Pelicula: ["titulo", "año", "duracion", "rating", "sinopsis", "activo"],
      Serie: ["titulo", "temporadas", "episodios", "rating", "sinopsis", "activo"],
      Genero: ["nombre", "popularidad", "descripcion", "subgeneros", "activo"],
      Actor: ["nombre", "nacionalidad", "edad", "premios", "activo"],
      Director: ["nombre", "nacionalidad", "edad", "premios", "activo"]
  };

  function getSelectedProperties() {
      return Array.from(document.querySelectorAll(".property-key")).map(select => select.value);
  }

  function updatePropertyDropdowns() {
      const selectedNodeType = nodeTypeSelect.value;
      const selectedProperties = new Set(getSelectedProperties());

      document.querySelectorAll(".property-key").forEach(select => {
          const currentValue = select.value;
          select.innerHTML = "";

          nodeProperties[selectedNodeType].forEach(property => {
              if (!selectedProperties.has(property) || property === currentValue) {
                  const option = document.createElement("option");
                  option.value = property;
                  option.textContent = property;
                  select.appendChild(option);
              }
          });

          select.value = currentValue;
      });

      addPropertyBtn.style.display = selectedProperties.size < nodeProperties[selectedNodeType].length ? "inline-block" : "none";
  }

  function toggleMultiNode() {
      if (multiNodeCheckbox.checked) {
          nodeIdsContainer.innerHTML = `
              <label class="form-label">IDs de los Nodos (separados por comas)</label>
              <input type="text" class="form-control" id="nodeIds" placeholder="Ejemplo: 101, 102, 103">
          `;
      } else {
          nodeIdsContainer.innerHTML = `
              <label class="form-label">ID del Nodo</label>
              <input type="number" class="form-control" id="nodeId" required>
          `;
      }
  }

  function addPropertyField(isFirst = false) {
      const selectedNodeType = nodeTypeSelect.value;
      const propertyGroup = document.createElement("div");
      propertyGroup.classList.add("row", "mb-3", "align-items-center");

      const propertySelectDiv = document.createElement("div");
      propertySelectDiv.classList.add("col-md-5");

      const propertySelect = document.createElement("select");
      propertySelect.classList.add("form-select", "property-key");
      nodeProperties[selectedNodeType].forEach(property => {
          if (!getSelectedProperties().includes(property)) {
              const option = document.createElement("option");
              option.value = property;
              option.textContent = property;
              propertySelect.appendChild(option);
          }
      });

      propertySelectDiv.appendChild(propertySelect);

      // Para Agregar o Editar se necesita un campo de valor, en Eliminar no
      const propertyInputDiv = document.createElement("div");
      propertyInputDiv.classList.add("col-md-5");

      if (!isDeleteForm) {
          const propertyInput = document.createElement("input");
          propertyInput.type = "text";
          propertyInput.classList.add("form-control", "property-value");
          propertyInputDiv.appendChild(propertyInput);
      }

      const deleteBtnDiv = document.createElement("div");
      deleteBtnDiv.classList.add("col-md-2");

      const deleteBtn = document.createElement("button");
      deleteBtn.type = "button";
      deleteBtn.classList.add("btn", "btn-danger", "w-100");
      deleteBtn.textContent = "Eliminar";
      deleteBtn.addEventListener("click", function () {
          propertiesContainer.removeChild(propertyGroup);
          updatePropertyDropdowns();
      });

      if (!isFirst) {
          deleteBtnDiv.appendChild(deleteBtn);
      }

      propertyGroup.appendChild(propertySelectDiv);
      propertyGroup.appendChild(propertyInputDiv);
      propertyGroup.appendChild(deleteBtnDiv);

      propertiesContainer.appendChild(propertyGroup);
      updatePropertyDropdowns();
  }

  nodeTypeSelect.addEventListener("change", function () {
      propertiesContainer.innerHTML = "";
      addPropertyField(true);
      updatePropertyDropdowns();
  });

  multiNodeCheckbox.addEventListener("change", toggleMultiNode);
  addPropertyBtn.addEventListener("click", () => addPropertyField());

  toggleMultiNode();
  addPropertyField(true);
});
