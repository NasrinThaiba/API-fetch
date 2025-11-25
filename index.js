const weatherDiv = document.getElementById('weather');

function getWeather() {
  const cityName = document.getElementById('city-name').value.trim();

  if (!cityName) {
    alert('Please enter a city name!');
    return;
  }

fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?key=UV26GKL97ETTLKHDF7X7NP5YP`)
//fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/chennai?key=UV26GKL97ETTLKHDF7X7NP5YP')
.then(response => response.json())
.then(data => {
    console.log(data);
    // console.log(data.resolvedAddress);
    // console.log(data.description);
    // console.log(data.currentConditions.humidity);
    // console.log(data.currentConditions.temp);
    // console.log(data.currentConditions.conditions);
    // console.log(data.currentConditions.icon);
    // console.log(data.latitude);
    // console.log(data.longitude);
    weatherDiv.innerHTML = `
    <p><strong>Location </strong> : ${data.resolvedAddress}</p>
    <p><strong>Temperature </strong> : ${data.currentConditions.temp}&deg;C</p>
    <p><strong>Humidity </strong> : ${data.currentConditions.humidity} %</p>
    <p><strong>Climate Conditions </strong> : ${data.currentConditions.conditions}</p>
    <p><strong>Latitude </strong> : ${data.latitude}&deg;N</p>
    <p><strong>Longitude </strong> : ${data.longitude}&deg;E</p>`
})

.catch(error => console.log('Error', error))
}