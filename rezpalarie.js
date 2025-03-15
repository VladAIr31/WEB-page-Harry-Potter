const allResults = JSON.parse(localStorage.getItem("results")) || [];
const resultsList = document.getElementById("allResultsList");

allResults.forEach(result => {
    const li = document.createElement("li");
    li.innerHTML = `Nume: <span class="house-${result.house.toLowerCase()}">${result.name}</span>, 
                    Casa: <span class="house-${result.house.toLowerCase()}">${result.house}</span>`;
    resultsList.appendChild(li);
});
