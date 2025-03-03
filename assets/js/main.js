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
    document.querySelectorAll(".input-search").forEach(inputField => {
        inputField.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {  
                event.preventDefault();
                let nodeId = this.value.trim();  // Get input value

                if (nodeId) {
                    fetch(`http://127.0.0.1:8000/search/${nodeId}`)  
                    .then(response => response.json())
                    .then(data => {
                        console.log("Parsed JSON response:", data);

                        if (data.error) {
                            updatePricingItem(this, "ID: Not found", "Type: Unknown");
                        } else {
                            let label = data.labels ? data.labels.join(", ") : "No label";
                            updatePricingItem(this, `ID: ${data.id}`, `Type: ${label}`);
                        }
                    })
                    .catch(error => console.error("Error fetching node:", error));
                }
            }
        });
    });



// Add dynamic property fields outside the pricing items
let propertiesContainer = document.querySelector(".properties-container");
let addButton = document.querySelector(".add-property");

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
    removeButton.addEventListener("click", function () {
        propertiesContainer.removeChild(propertyDiv);
    });

    propertyDiv.appendChild(keyInput);
    propertyDiv.appendChild(valueInput);
    propertyDiv.appendChild(removeButton);
    propertiesContainer.appendChild(propertyDiv);
});

// Handle form submission
document.querySelector(".submit-relation").addEventListener("click", function () {
  let fromPricing = document.querySelectorAll(".pricing-item")[0];
  let toPricing = document.querySelectorAll(".pricing-item")[1];

  let fromTitle = fromPricing.querySelector(".pricing-title").textContent;
  let fromType = fromPricing.querySelector(".pricing-type").textContent;
  let toTitle = toPricing.querySelector(".pricing-title").textContent;
  let toType = toPricing.querySelector(".pricing-type").textContent;
  let relationType = document.querySelector(".relationship-type").value.trim();

  if (!fromTitle.includes("ID:") || !toTitle.includes("ID:") || relationType === "") {
      alert("Please make sure both nodes are selected and a relationship type is entered.");
      return;
  }

  let fromId = parseInt(fromTitle.replace("ID: ", ""));
  let toId = parseInt(toTitle.replace("ID: ", ""));
  let fromLabel = fromType.replace("Type: ", "");
  let toLabel = toType.replace("Type: ", "");

  let properties = {};
  document.querySelectorAll(".property").forEach(propDiv => {
      let key = propDiv.querySelector(".property-key").value.trim();
      let value = propDiv.querySelector(".property-value").value.trim();

      if (key && value) {
          properties[key] = isNaN(value) ? value : parseFloat(value); 
      }
  });

  let requestData = {
      from_label: fromLabel,
      from_id: fromId,
      to_label: toLabel,
      to_id: toId,
      relation_type: relationType,
      properties: properties
  };

  console.log("Sending data:", requestData);

  fetch("http://127.0.0.1:8000/relation/create", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(requestData)
  })
  .then(response => response.json())
  .then(data => {
      console.log("Response:", data);
      alert(data.message || "Relation created successfully!");
  })
  .catch(error => console.error("Error creating relation:", error));
});
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