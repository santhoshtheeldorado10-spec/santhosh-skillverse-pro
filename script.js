const API_KEY = "1231acaea979d3c12a91dd465a436d5b";

// FETCH WEATHER
async function getWeather(cityInput) {
  let city = cityInput || document.getElementById("city").value;

  if (!city) return;

  try {
    let res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
    );
    let data = await res.json();

    document.getElementById("cityName").innerText = data.name;
    document.getElementById("temp").innerText = data.main.temp + "°C";
    document.getElementById("desc").innerText = data.weather[0].main;
    document.getElementById("humidity").innerText =
      "💧Humidity " + data.main.humidity + "%";
    document.getElementById("wind").innerText =
      "🌬 Wind " + data.wind.speed + " km/h";

    setIcon(data.weather[0].main);
    changeBG(data.weather[0].main);

    let res2 = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`,
    );
    let forecast = await res2.json();

    showForecast(forecast);
  } catch {
    alert("City not found");
  }
}

// LOCATION
function getLocation() {
  navigator.geolocation.getCurrentPosition(async (pos) => {
    let { latitude, longitude } = pos.coords;

    let res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`,
    );
    let data = await res.json();

    getWeather(data.name);
  });
}

// ICON
function setIcon(cond) {
  let icon = document.getElementById("icon");

  if (cond.includes("Cloud")) icon.innerText = "☁️";
  else if (cond.includes("Rain")) icon.innerText = "🌧️";
  else if (cond.includes("Clear")) icon.innerText = "☀️";
  else icon.innerText = "🌤️";
}

// FORECAST
function showForecast(data) {
  let box = document.getElementById("forecast");
  box.innerHTML = "";

  let days = data.list.filter((i) => i.dt_txt.includes("12:00:00"));

  days.forEach((day) => {
    let d = new Date(day.dt_txt);

    let div = document.createElement("div");
    div.innerHTML = `
      <p>${d.toLocaleDateString()}</p>
      <p>${day.main.temp}°C</p>
    `;

    box.appendChild(div);
  });
}

// BACKGROUND
function changeBG(cond) {
  let body = document.body;

  if (cond.includes("Clear")) {
    body.style.background = "linear-gradient(135deg, #f7971e, #ffd200)";
  } else if (cond.includes("Cloud")) {
    body.style.background = "linear-gradient(135deg, #bdc3c7, #2c3e50)";
  } else if (cond.includes("Rain")) {
    body.style.background = "linear-gradient(135deg, #373b44, #4286f4)";
  }
}

// DARK MODE
function toggleTheme() {
  document.body.classList.toggle("dark");
}
