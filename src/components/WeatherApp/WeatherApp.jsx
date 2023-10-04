import React, {useState} from "react";
import './WeatherApp.css';

import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/sun.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/cloudy.png";
import rain_icon from "../Assets/heavy-rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";

const WeatherApp = () => {

    let api_key = '5e3fc4e0d78dc4db4fe2ad97c69a1e8e';
    const [wicon, setWicon] = useState(cloud_icon);

    const search = async () => {
        const element = document.getElementsByClassName('cityInput');
        if (element[0].value === "") {
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
        let response = await fetch(url);
        let data = await response.json();

        const humidity = document.getElementsByClassName('humidity-percent');
        const wind = document.getElementsByClassName('wind-rate');
        const temperature = document.getElementsByClassName('weather-temp');
        const location = document.getElementsByClassName('weather-location');
        const description = document.getElementsByClassName('weather-description');

        humidity[0].innerHTML = data.main.humidity + ' %';
        wind[0].innerHTML = Math.floor(data.wind.speed) + ' km/h';
        temperature[0].innerHTML = Math.floor(data.main.temp) + '°';
        location[0].innerHTML = data.name;
        description[0].innerHTML = data.weather[0].description.replace(/\b\w/g, l => l.toUpperCase());

        const iconMapping = {
            '01d': clear_icon,
            '01n': clear_icon,
            '02d': cloud_icon,
            '02n': cloud_icon,
            '03d': drizzle_icon,
            '03n': drizzle_icon,
            '04d': drizzle_icon,
            '04n': drizzle_icon,
            '09d': rain_icon,
            '09n': rain_icon,
            '10d': rain_icon,
            '10n': rain_icon,
            '13d': snow_icon,
            '13n': snow_icon,
        };
        const defaultIcon = clear_icon;
        const selectedIcon = iconMapping[data.weather[0].icon] || defaultIcon;
        setWicon(selectedIcon);
    }

    return (
        <div className="container">
            <div className="top-bar">
                <input type="text" className="cityInput" placeholder="Search..."/>
                <div className="search-icon" onClick={() => {search()}}>
                    <img src={search_icon} alt=""/>
                </div>
            </div>
            <div className="weather-image">
                <img src={wicon} alt=""/>
            </div>
            <div className="weather-temp">30°</div>
            <div className="weather-description">Few Clouds</div>
            <div className="weather-location">Barranquilla, CO</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="" className="icon"/>
                    <div className="data">
                        <div className="humidity-percent">85%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                    <div className="element">
                        <img src={wind_icon} alt="" className="icon"/>
                        <div className="data">
                            <div className="wind-rate">18 km/h</div>
                            <div className="text">Wind Speed</div>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default WeatherApp