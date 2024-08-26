import React, { useState, useEffect } from "react";
import "./TimeSelector.css";

type TimeProps = {
  onCreatedAt: (createdAt: string) => void;
};

const TimeSelector = ({ onCreatedAt }: TimeProps) => {
  const formatDate = (date: Date) => {
    const d = new Date(date);
    const month = (`0${d.getMonth() + 1}`).slice(-2);
    const day = (`0${d.getDate()}`).slice(-2);
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    return {
      date: formatDate(now),
      time: now.toTimeString().slice(0, 5),
      seconds: now.getSeconds(),
    };
  };

  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("09:00");
  const [seconds, setSeconds] = useState<string>("");
  const [iso8601, setIso8601] = useState<string>("");
  const [dateTimeLocal, setDateTimeLocal] = useState<string>("");

  const loadTimeNow = () => {
    const { date, time, seconds } = getCurrentDateTime();
    const _seconds = String(seconds).padStart(2, '0')
    console.log(getCurrentDateTime())
    updateDateTime(new Date(`${date}T${time}:${_seconds}`));
  };

  useEffect(() => {
    loadTimeNow();
  }, []);

  const updateDateTime = (dateTime: Date) => {
    console.log(dateTime)
    const date = formatDate(dateTime);
    const time = dateTime.toTimeString().slice(0, 5);
    const seconds = dateTime.getSeconds();
    const isoString = dateTime.toISOString();
    const localDateTime = dateTime.toLocaleString();

    setDate(date);
    setTime(time);
    setSeconds(seconds.toString().padStart(2, "0"));
    setIso8601(isoString);
    setDateTimeLocal(localDateTime);
    onCreatedAt(isoString);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(event.target.value);
    updateDateTime(new Date(`${selectedDate.toISOString().split('T')[0]}T${time}:${seconds}`));
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateDateTime(new Date(`${date}T${event.target.value}:${seconds}`));
  };

  const handleSecondsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateDateTime(new Date(`${date}T${time}:${event.target.value}`));
  };

  return (
    <div className="time-container-fix">
      <div className="time-header">
        <h1>Custom Time Selector</h1>
        <button onClick={loadTimeNow}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 2.1l4 4-4 4" />
            <path d="M3 12.2v-2a4 4 0 0 1 4-4h12.8M7 21.9l-4-4 4-4" />
            <path d="M21 11.8v2a4 4 0 0 1-4 4H4.2" />
          </svg>
          Load time
        </button>
      </div>
      <div className="selectorRow">
        <div className="time-selector">
          <label htmlFor="date-input">Select Date: </label>
          <input
            type="date"
            id="date-input"
            value={date}
            onChange={handleDateChange}
          />
          <div>Date: <span>{date}</span></div>
        </div>
        <div className="time-selector">
          <label htmlFor="time-input">Select Time: </label>
          <input
            type="time"
            id="time-input"
            value={time}
            onChange={handleTimeChange}
          />
          <div>Time: <span>{new Date(`${date}T${time}`).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true })}</span></div>
        </div>
        <div className="time-selector">
          <label htmlFor="seconds-input">Select Seconds: </label>
          <input
            type="number"
            id="seconds-input"
            value={seconds}
            onChange={handleSecondsChange}
            min="0"
            max="59"
          />
          <div>Second: <span>{seconds}</span></div>
        </div>
      </div>
      <div className="time-box">
        <div>ISO 8601: <span>{iso8601}</span></div>
        <div>Date & Time (Adjusted to Your Time Zone): <span>{dateTimeLocal}</span></div>
      </div>
    </div>
  );
};

export default TimeSelector;
