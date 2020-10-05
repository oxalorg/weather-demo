import React, { useState, useMemo } from "react";
import moment from "moment";
import { KelvinToCelcius } from "../utils";

import styles from "./Landing.module.scss";
import DateSelector from "./DateSelector.jsx";

const HourlyList = ({ hourly, selectCurrentTimeSlot, currentDt }) => {
  return (
    <div className={styles.timeSlot}>
      <div className={styles.timeSlot__list}>
        {hourly.map((item) => {
          var hourTime = moment.unix(item.dt);
          return (
            <div
              key={item.dt}
              className={
                currentDt === item.dt
                  ? styles.timeSlot__item__active
                  : styles.timeSlot__item
              }
              onClick={(e) => {
                e.preventDefault();
                selectCurrentTimeSlot(item.dt);
              }}
            >
              <div className={styles.timeSlot__itemTime}>
                {hourTime.format("h a")}
              </div>
              <div className={styles.timeSlot__itemTemp}>
                {KelvinToCelcius(item.temp)} &deg;
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const UserCity = ({ timezone }) => {
  return <button className={styles.badge}>{timezone}</button>;
};

const matchesDayOffset = (dt, dayOffset) => {
  let offsetDay = moment().add(dayOffset, "days");
  let matches = moment.unix(dt).isSame(offsetDay, "day");
  return matches;
};

const Landing = ({ weather }) => {
  let [selectedDay, setSelectedDay] = useState(0);
  let hourly = useMemo(() => {
    return weather.hourly.filter((item) => {
      return matchesDayOffset(item.dt, selectedDay);
    });
  }, [selectedDay]);
  let [current, setCurrent] = useState(weather.hourly[0]);

  const selectCurrentTimeSlot = (dt) => {
    let selected = hourly.find((item) => item.dt === dt);
    console.log(selected);
    setCurrent(selected);
  };

  return (
    <div className={styles.container}>
      <div className={styles.tempCityContainer}>
        <div>
          <UserCity weather={weather} />
        </div>
        <div className={styles.currentTemp}>
          {KelvinToCelcius(current.temp)}
          <span className={styles.currentTemp__unit}>0C</span>
        </div>
        <div className="font-bold">{current.weather[0].description}</div>
      </div>
      <div className={styles.statusSelectorContainer}>
        <HourlyList
          hourly={hourly}
          selectCurrentTimeSlot={selectCurrentTimeSlot}
          currentDt={current.dt}
        />
        <DateSelector
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
        />
      </div>
    </div>
  );
};

export default Landing;
