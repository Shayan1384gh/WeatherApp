import React, {useEffect, useState} from "react";
import moment from "moment-jalaali";

const weekdays = [
    "یکشنبه",
    "دوشنبه",
    "سه شنبه",
    "چهارشنبه",
    "پنج شنبه",
    "جمعه",
    "شنبه",
]

const months = [
    "فرودین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "ابان",
    "اذر",
    "دی",
    "بهمن",
    "اسفند",
]

const Time = ()=>{
    const [date, setDate] = useState("")
    useEffect(() => {
        let m = moment()
        let finalDate = `${weekdays[m.day()]} ${m.jDate()} ${months[m.jMonth()]}`
        setDate(finalDate)
    }, []);
    return (
        <p className="text-sm text-gray-500 mb-6">{date}</p>
    )
}

export default Time;