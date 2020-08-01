const appid = "0fac701c7e5927446226e2c7a0684469";
const url = "https://api.openweathermap.org/data/2.5/weather?q=";

const form = $("#get-weather-form");
const formQs = document.querySelector("#get-weather-form");
const locationInput = $("#location");
const error = document.querySelector("#error");
const results = $("#results");

const generateResposneHTML = (response) => {
  return `<div class="alert alert-success" role="alert">
            <p class="result">
                <span class="label">Temperature: </span> ${response.main.temp}
            </p>
            <p class="result">
                <span class="label">Minimum Temperature :</span> ${response.main.temp_min}
            </p>
            <p class="result">
                <span class="label">Maximum Temperature :</span> ${response.main.temp_max}
            </p>
            <p class="result">
                <span class="label">Presurre :</span> ${response.main.pressure}
            </p>
            <p class="result">
                <span class="label">Humidity :</span> ${response.main.humidity}
            </p>
        </div>`;
};

const generateError = (e) => {
  return `<div class="alert alert-primary" role="alert">${JSON.stringify(
    e
  )}</div>`;
};

form.submit(async (e) => {
  e.preventDefault();

  const location = locationInput.val();

  console.log(locationInput.val());

  try {
    const res = await fetch(`${url}${location}&appid=${appid}`);
    const parsedResponse = await res.json();

    if (res.status >= 400 && res.status < 600) {
      throw parsedResponse;
    }

    results.html(generateResposneHTML(parsedResponse));
  } catch (e) {
    results.html(generateError(e.message));
  }
});
