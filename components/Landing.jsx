import React, { useState, useMemo } from "react";
import moment from "moment";
import { KelvinToCelcius } from "../utils";

import styles from "./Landing.module.scss";
import DateSelector from "./DateSelector";
import HourlyList from "./HourlyList";
import FadeAnimation from "./FadeAnimation";
import { CSSTransition } from "react-transition-group";

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
  let shapeBgColor = useMemo(() => {
    let colorMaps = ["yellow", "blue", "cyan", "gray"];
    return colorMaps[Math.floor(Math.random() * colorMaps.length)];
  }, [current]);

  const selectCurrentTimeSlot = (dt) => {
    let selected = hourly.find((item) => item.dt === dt);
    setCurrent(selected);
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.shape}
        style={{ backgroundColor: shapeBgColor }}
      ></div>
      <div className={styles.tempCityContainer}>
        <div>
          <UserCity timezone={weather.timezone} />
        </div>
        <FadeAnimation transitionKey={current.dt}>
          <div
            className={
              styles.currentTemp + " transition duration-150 ease-in-out"
            }
          >
            {KelvinToCelcius(current.temp)}
            <span className={styles.currentTemp__unit}>&deg;C</span>
          </div>
        </FadeAnimation>
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
        <FadeAnimation transitionKey={current.dt}>
          <WeatherDescription description={current.weather[0].description} />
        </FadeAnimation>
      </div>
    </div>
  );
};

export default Landing;
