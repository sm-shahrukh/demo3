const multiCityList = document.querySelector("#multi-city-list");
const multiFlightTemplate = document.querySelector("#multi-flight-template");
const flightCount = document.querySelector("#flight-count");

if (multiCityList && multiFlightTemplate && flightCount) {
  const maximumFlights = 6;

  function refreshFlightRows() {
    const rows = [...multiCityList.querySelectorAll(".multi-flight")];
    const totalFlights = rows.length + 1;
    flightCount.textContent = totalFlights;

    rows.forEach((row, index) => {
      const flightNumber = index + 2;
      row.querySelector(".multi-flight-title").textContent = `Flight ${flightNumber}`;

      const addButton = row.querySelector(".add-flight");
      const removeButton = row.querySelector(".remove-flight");
      addButton.hidden = false;
      addButton.disabled = totalFlights >= maximumFlights;
      removeButton.disabled = totalFlights <= 2;
    });
  }

  multiCityList.addEventListener("click", (event) => {
    const addButton = event.target.closest(".add-flight");
    const removeButton = event.target.closest(".remove-flight");

    if (addButton) {
      const rows = [...multiCityList.querySelectorAll(".multi-flight")];
      const totalFlights = rows.length + 1;
      if (totalFlights >= maximumFlights) return;

      const row = multiFlightTemplate.content.firstElementChild.cloneNode(true);
      const flightNumber = totalFlights + 1;
      row.querySelector(".multi-flight-title").textContent = `Flight ${flightNumber}`;
      row.querySelectorAll("[data-field]").forEach((field) => {
        field.name = `flight${flightNumber}-${field.dataset.field}`;
      });

      const previousDestination = rows.at(-1)?.querySelector('[name$="-to"]')?.value;
      const from = row.querySelector('[data-field="from"]');
      const to = row.querySelector('[data-field="to"]');
      if (previousDestination && [...from.options].some((option) => option.value === previousDestination)) {
        from.value = previousDestination;
      }
      if (to.value === from.value) {
        to.selectedIndex = to.options.length > 1 ? 1 : 0;
      }

      multiCityList.append(row);
      refreshFlightRows();
    }

    if (removeButton) {
      const rows = multiCityList.querySelectorAll(".multi-flight");
      if (rows.length <= 1) return;
      removeButton.closest(".multi-flight").remove();
      refreshFlightRows();
    }
  });

  refreshFlightRows();
}
