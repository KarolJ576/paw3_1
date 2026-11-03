(function () {
  document.getElementById("ex1_button").addEventListener("click", async () => {
    const content = document.getElementById("ex1_content");
    const capital = "Warsaw";

    content.textContent = "Ładowanie...";

    try {
      const response = await fetch(
        `https://api.restcountries.com/countries/v5/capitals/${encodeURIComponent(capital)}`,
        {
          headers: {
            Authorization: "Bearer rc_live_9a686ff4d92a4e558217cd6dde7b0948",
          },
        },
      );
      //.then(function (response) {
      //  return response.json();
      //})
      //.then(function (data) {
      //  console.log(data);
      //});

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();
      console.log(data); // sprawdź strukturę

      const countries =
        data.data?.objects ?? (Array.isArray(data) ? data : [data]);

      const table = document.createElement("table");
      table.border = "1";

      const headRow = table.createTHead().insertRow();
      ["Name", "Capital", "Population", "Region", "Subregion"].forEach(
        (title) => {
          const th = document.createElement("th");
          th.textContent = title;
          headRow.appendChild(th);
        },
      );

      const tbody = table.createTBody();
      countries.forEach((country) => {
        const row = tbody.insertRow();
        [
          country.names.common,
          (country.capitals || []).map((c) => c.name).join(", "),
          country.population != null
            ? country.population.toLocaleString("pl-PL")
            : "-",
          country.region,
          country.subregion || "-",
        ].forEach((value) => {
          row.insertCell().textContent = value;
        });
      });

      content.replaceChildren(table);
    } catch (err) {
      content.textContent = `Błąd: ${err.message}`;
    }
  });
})();
