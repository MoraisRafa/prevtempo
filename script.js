const input = document.querySelector("input");
const button = document.querySelector("button");

const placeholder = document.querySelector("#place");
const degrees = document.querySelector("#degrees");
const img = document.querySelector("img");
const wind = document.querySelector("#wind");
const max = document.querySelector("#max");
const min = document.querySelector("#min");
const content = document.querySelector(".content");
const form = document.getElementById("input");

button.addEventListener("click", () => {
    if (!input.value) return;

    getDataApi();
});

form.addEventListener("keyup", function (event) {
    if (event.code === 'Enter') { 
        
        getDataApi();
    }
    
});



async function getDataApi() {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input.value)}&units=metric&appid=6f16ddea0057f3ac9ed488d42b840a07`;

    try {
        await fetch(url)
            .then((res) => res.json())
            .then((data) => {
                if (data?.cod && data.cod === "404") {
                    return alert("Cidade não encontrada!");
                }

                loadData(data);
            });
    } catch (error) {
        alert(error);
    }
}

function loadData(data) {
    place.innerHTML = `${data.name}, ${data.sys.country}`;
    degrees.innerHTML = `${Math.floor(data.main.temp_min)}° C`;
    img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    wind.innerHTML = `Vento: ${data.wind.speed} km/h`;
    max.innerHTML = `Máx: ${Math.floor(data.main.temp_max)}° C / `;
    min.innerHTML = `Min: ${Math.floor(data.main.temp_min)}° C`;
    content.style.display = "flex";
};