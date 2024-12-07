async function fetchWeather(location) {
    const apiKey = 'YBXK5AULQAGDNJ2KZJVSNA5C8';
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${apiKey}`;
    try {
        const response = await fetch(url, {mode: 'cors'});
        if (!response.ok) throw new Error('Location not found');
        const data = await response.json();
        console.log(data); // Log raw data for debugging
        return data;
    } catch (error) {
        console.error(error.message);
    }
}

function processWeatherData(data) {
    return {
        location: data.resolvedAddress,
        temperature: data.currentConditions.temp,
        condition: data.currentConditions.conditions,
        // description: data.days[0].description,
        humidity: data.currentConditions.humidity,
        windSpeed: data.currentConditions.windspeed
    };
}

document.getElementById('location-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const location = document.getElementById('location-input').value.trim();
    if (!location) return;

    const loadingElement = document.getElementById('loading');
    loadingElement.style.display = 'block';

    const rawData = await fetchWeather(location);
    loadingElement.style.display = 'none';

    if (rawData) {
        const weatherData = processWeatherData(rawData);
        console.log(weatherData);
        displayWeather(weatherData);
    }
});

function displayWeather(weather) {
    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.innerHTML = `
        <h2>${weather.location}</h2>
        <p><span class="temperature">${weather.temperature}°C</p>
        <p>Condtions: ${weather.condition}</p>
        <p>Humidity: ${weather.humidity}%</p>
        <p>Wind Speed: ${weather.windSpeed} m/s</p>
    `;
}

