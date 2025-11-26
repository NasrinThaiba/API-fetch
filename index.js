const API_KEY = 'UV26GKL97ETTLKHDF7X7NP5YP'
const weatherDiv = document.getElementById('weather');
const weekWeatherReport = document.getElementById('week-report');
const loadingDiv = document.getElementById('loading');

let fetchedData = null;

async function getWeather() {
  const cityName = document.getElementById('city-name').value.trim();

  if (!cityName) {
    alert('Please enter a city name!');
    return;
  }

  loadingDiv.style.display = 'block';
  weatherDiv.innerHTML = '';
  weekWeatherReport.innerHTML = ''

  try{
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?key=${API_KEY}`);
    if (!response.ok) {
      throw new Error('Location not found');
    }
    const data = await response.json();
    console.log(data);
    loadingDiv.style.display = 'none';
    fetchedData = data;


    weatherDiv.innerHTML = `
    <div class = "weather-box">
    <p class = "cityName"> ${data.resolvedAddress}</p>

    <p class = "icon"> 
    <img src="https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/1st%20Set%20-%20Color/${data.currentConditions.icon}.png">
    </p>

    <p class="condition"> ${data.currentConditions.conditions}</p>
    
    <div class = "temp-humid">
    <p class="temperature"> <strong> Temperature </strong> : ${data.currentConditions.temp} &deg;C </p>
    <p class="humidity"> <strong> Humidity </strong> : ${data.currentConditions.humidity} % </p>
    </div>
    
    <div class="description"> 
    <p>${data.description || ""}</p> 
    </div>
    
    <div>`;

    document.getElementById('forecast-button-container').style.display = 'block';

    document.getElementById("show-forecast-btn").addEventListener("click", ()=> {
      if(!fetchedData)
        return;
    document.getElementById('forecast-button-container').style.display = 'none';

    weekWeatherReport.innerHTML = `
      <div class="table-container">
        <h2>Weather Forecast</h2>
        <table class="week-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Icon</th>
              <th>Conditions</th>
              <th>Temp (°C)</th>
              <th>Humidity %</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
    `;

    const tableBody = document.querySelector(".week-table tbody");
    data.days.slice(1,8).forEach(day => {
      tableBody.innerHTML += `
      <tr> 
      <td>${day.datetime}</td>
      <td><img src="https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/1st%20Set%20-%20Color/${day.icon}.png"></td>
      <td>${day.conditions}</td>
      <td>${day.temp}</td>
      <td>${day.humidity}</td>
      
      </tr>`
    })

})
  }catch (error) {
    loadingDiv.style.display = 'none';
    console.error('Error fetching weather:', error);
    weatherDiv.innerHTML = `<p style="color:red;">Error: Could not fetch weather data.</p>`;
  }
}