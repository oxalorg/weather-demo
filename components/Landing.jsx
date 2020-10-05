import React, { useState, useMemo } from "react";
import moment from "moment";
import { KelvinToCelcius } from "../utils";

import styles from "./Landing.module.scss";
import DateSelector from "./DateSelector.jsx";
import HourlyList from "./HourlyList.jsx";

const UserCity = ({ timezone }) => {
  return <button className={styles.badge}>{timezone}</button>;
};

const WeatherDescription = ({ description }) => {
  const isTooLong = description.length > 14;
  return (
    <div className={styles.weatherDescription}>
      {isTooLong ? description.substring(0, 14) + "..." : description}
    </div>
  );
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
      </div>
      <div className={styles.statusSelectorContainer}>
        <HourlyList
          hourly={hourly}
          selectCurrentTimeSlot={selectCurrentTimeSlot}
          currentDt={current.dt}
        />
        <div className={styles.dateSelectorContainer}>
          <DateSelector
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
          />
        </div>
        <WeatherDescription description={current.weather[0].description} />
      </div>
    </div>
  );
};

export default Landing;
