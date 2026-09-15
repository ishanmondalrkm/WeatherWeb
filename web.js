const weatherForm= document.querySelector(".weatherForm");
const cityInput= document.querySelector(".cityInput");
const card= document.querySelector('.card');
const apikey= "0a7ede9c2532eabd500a49d829f58e23";
const backgroundImage= document.querySelector(".background");

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const city= cityInput.value.trim();
    if(city){
        try{
       const weatherData= await getWeather(city);
       displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Please enter a city name!");
    }
});

async function getWeather(city) {

    const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apikey}`;
    const response= await fetch(apiUrl);
    console.log(response);

    if(!response.ok){
        throw new Error("Please enter a valid city name!");
    }
     return await response.json();
}
function displayWeatherInfo(data) {
  
    const{name:city,
          main:{temp,humidity,pressure},
          weather:[{description,id}],
          wind:{speed:windSpeed},
          visibility
           }=data;

     card.textContent ="";
     card.style.display="flex";

     const cityNameDis=document.createElement("h1"); 
     const temperatureDis=document.createElement("p");
     const descriptionDis=document.createElement("p");
     const humidityDis=document.createElement("p");
     const weatherIconDis=document.createElement("p");
     const windSpeedDis=document.createElement("p");
     const pressureDis=document.createElement("p");
     const visibilityDis=document.createElement("p");

     cityNameDis.textContent=city;
     temperatureDis.textContent=`Temperature: ${(temp-273.15).toFixed(1)}°C`;
     descriptionDis.textContent=` ${description}`;
     humidityDis.textContent=`Humidity: ${humidity}%`;
     weatherIconDis.textContent=getWeatherIcon(id);
     windSpeedDis.textContent=`Wind Speed: ${windSpeed} m/s`;
     pressureDis.textContent=`Pressure: ${pressure} hPa`;
     visibilityDis.textContent=`Visibility:${visibility/1000} km`;


    cityNameDis.classList.add("cityNameDis");
    temperatureDis.classList.add("temperatureDis");
    descriptionDis.classList.add("descriptionDis");
    humidityDis.classList.add("humidityDis");
    weatherIconDis.classList.add("weatherIconDis");
    windSpeedDis.classList.add("windSpeedDis");
    pressureDis.classList.add("pressureDis");
    visibilityDis.classList.add("visibilityDis");

     card.appendChild(cityNameDis);
     card.appendChild(temperatureDis);
     card.appendChild(descriptionDis);
     card.appendChild(humidityDis);
     card.appendChild(weatherIconDis);
     card.appendChild(windSpeedDis);
     card.appendChild(pressureDis);
     card.appendChild(visibilityDis);

}

function getWeatherIcon(weatherId) {
  switch(true){
    case(weatherId>=200 && weatherId<300): 
        backgroundImage.style.backgroundImage="url('pics/Screenshot 2026-09-13 205438.png')";
        return "⛈️";
    case(weatherId>=300 && weatherId<400):
        backgroundImage.style.backgroundImage="url('pics/Screenshot 2026-09-13 205353.png')";
        return "🌦️";
    case(weatherId>=500 && weatherId<600):
       backgroundImage.style.backgroundImage="url('pics/Screenshot 2026-09-13 205353.png')";
        return "🌧️";
    case(weatherId>=600 && weatherId<700):
         backgroundImage.style.backgroundImage="url('pics/Screenshot 2026-09-13 205501.png')";
        return "❄️";
    case(weatherId>=700 && weatherId<800):
        backgroundImage.style.backgroundImage="url('pics/Screenshot 2026-09-13 205341.png')";
        return "🌫️";
    case(weatherId===800):
        backgroundImage.style.backgroundImage="url('pics/Screenshot 2026-09-13 205325.png')";
        return "☀️";
    case(weatherId>=801&& weatherId<900):
        backgroundImage.style.backgroundImage="url('pics/Screenshot 2026-09-13 205308.png')";
       return "☁️";    
    default:
        backgroundImage.style.backgroundImage="url('pics/Screenshot 2026-09-09 200323.png')";
        return "❓";
  }
}

function displayError(message) {
    const errorDisplay=document.createElement("p");
    errorDisplay.textContent=message;
     
    errorDisplay.classList.add("errorDisplay");

    card.textContent="";
    card.style.display="flex";
    card.appendChild(errorDisplay);

}