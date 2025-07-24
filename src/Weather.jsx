import React, { useEffect, useState } from "react";
import Time from "./Time";
import axios from "axios";

export default function WeatherCard() {
    const [loading, setLoading] = useState(false);
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState("");
    const [input, setInput] = useState("");

    const apikey = "f41ea73c3560464725c58d19da39329e";

    const getWeatherData = (location) => {
        setLoading(true);
        setError("");
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}&lang=fa`)
            .then((res) => {
                setWeatherData(res.data);
                setLoading(false);
            })
            .catch(() => {
                setError("شهر مورد نظر یافت نشد!");
                setWeatherData(null);
                setLoading(false);
            });
    };

    const handleSubmit = () => {
        if (!input.trim()) {
            setError("نام شهر را وارد کنید");
            return;
        }
        getWeatherData(input.trim());
    };

    useEffect(() => {
        getWeatherData("Tehran");
    }, []);

    const formatTime = (unix) => {
        const date = new Date(unix * 1000);
        return date.toLocaleTimeString("fa-IR", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-blue-500 to-sky-400 p-6">
            <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl w-full max-w-md p-8 space-y-8 relative border-4 border-white">
                {/* دکمه سرچ */}
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="نام شهر را وارد کنید..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value);
                            setError("");
                        }}
                    />
                    <button
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl transition-all shadow-md"
                        onClick={handleSubmit}
                    >
                        جستجو
                    </button>
                </div>

                {/* پیام‌ها */}
                {loading && <p className="text-indigo-700 font-medium animate-pulse">در حال دریافت اطلاعات...</p>}
                {error && <p className="text-red-600 font-semibold">{error}</p>}

                {/* دیتا */}
                {weatherData && weatherData.main && (
                    <>
                        <h2 className="text-3xl font-extrabold text-gray-800">{weatherData.name}</h2>
                        <Time />

                        <div className="flex justify-center items-center gap-4 my-4">
                            <img
                                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
                                alt="weather icon"
                                className="w-24 h-24 animate-bounce-slow"
                            />
                            <div>
                                <p className="text-5xl font-bold text-gray-700">
                                    {(weatherData.main.temp - 273.15).toFixed(1)}°C
                                </p>
                                <p className="text-gray-600 text-lg">{weatherData.weather[0].description}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 text-sm text-gray-700 font-medium">
                            <div className="bg-gray-100 p-3 rounded-xl shadow-inner">
                                <p>باد</p>
                                <p className="text-indigo-600">{(weatherData.wind.speed * 3.6).toFixed(1)} km/h</p>
                            </div>
                            <div className="bg-gray-100 p-3 rounded-xl shadow-inner">
                                <p>رطوبت</p>
                                <p className="text-indigo-600">{weatherData.main.humidity}%</p>
                            </div>
                            <div className="bg-gray-100 p-3 rounded-xl shadow-inner">
                                <p>فشار هوا</p>
                                <p className="text-indigo-600">{weatherData.main.pressure} hPa</p>
                            </div>
                            <div className="bg-gray-100 p-3 rounded-xl shadow-inner">
                                <p>حس واقعی</p>
                                <p className="text-indigo-600">{(weatherData.main.feels_like - 273.15).toFixed(1)}°C</p>
                            </div>
                            <div className="bg-gray-100 p-3 rounded-xl shadow-inner col-span-2">
                                <p>طلوع آفتاب</p>
                                <p className="text-indigo-600">{formatTime(weatherData.sys.sunrise)}</p>
                                <p className="mt-1">غروب آفتاب: <span className="text-indigo-600">{formatTime(weatherData.sys.sunset)}</span></p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
