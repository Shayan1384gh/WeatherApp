// components/WeatherCard.jsx
import React, {useState} from "react";
import Time from "./Time";
import axios from "axios";

export default function WeatherCard() {
    const [loading , setLoading] = useState(false)
    const [weatherData, setWeatherData] = useState({})
    const [error, setError] = useState("")
    const [input, setInput] = useState("")
    const apikey = "f41ea73c3560464725c58d19da39329e"

    const getWeatherData = (location)=>{
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}`).then(res=>{
            setWeatherData(res.data)
            setLoading(false)
        }).catch(err=>{
            setError(err)
        })
    }

    const handleSubmit = () => {
        setLoading(true)
        getWeatherData(input)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 to-indigo-400 p-6">
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 text-center space-y-6">
                {/* جستجوی شهر */}
                <div className="flex items-center gap-2 justify-center">
                    <input
                        type="text"
                        placeholder="نام شهر را وارد کنید..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        onClick={handleSubmit}
                    >
                        جستجو
                    </button>
                </div>

                {/* پیام لودینگ یا خطا */}
                {loading && <p className="text-blue-600">در حال بارگذاری...</p>}
                {error && <p className="text-red-600">خطایی رخ داده است</p>}

                {/* اطلاعات هواشناسی */}
                {weatherData.main && weatherData.wind && (
                    <>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">{weatherData.name}</h2>
                        <Time />

                        <div className="flex justify-center items-center gap-6 mb-6">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/869/869869.png"
                                alt="weather icon"
                                className="w-20 h-20"
                            />
                            <div>
                                <p className="text-5xl font-bold text-gray-700">
                                    {(weatherData.main.temp - 273.15).toFixed(1)}°C
                                </p>
                                <p className="text-gray-500 text-sm">
                                    {weatherData.weather[0].description}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                            <div>
                                <p className="font-semibold">باد</p>
                                <p>{weatherData.wind.speed} km/h</p>
                            </div>
                            <div>
                                <p className="font-semibold">رطوبت</p>
                                <p>{weatherData.main.humidity}%</p>
                            </div>
                            <div>
                                <p className="font-semibold">فشار</p>
                                <p>{weatherData.main.pressure} hPa</p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );

}