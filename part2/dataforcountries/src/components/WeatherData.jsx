import { useEffect, useState } from "react";
import weatherService from "../services/weather";

const WeatherBlock = ({ cityCoordinates }) => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        if (cityCoordinates) {
            const [lat, lng] = cityCoordinates;
            weatherService.searchByLatLon(lat, lng)
                .then(result => setWeather(result))
                .catch(err => console.warn(err))
        }
    }, [cityCoordinates])

    if (!weather) {
        return null;
    }

    return (
        <>
            <p>temperature {weather.main.temp} Celcius</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather_icon" />
            <p>wind {weather.wind.speed} m/s</p>
        </>
    )
}

export default WeatherBlock;