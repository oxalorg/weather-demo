import moment from "moment";
import axios from "axios";
import { KelvinToCelcius } from "../utils.js";
import styles from "./Landing.module.scss";

const HourlyList = ({ weather }) => {
  let time = moment.unix(weather.current.dt);
  return (
    <div className={styles.timeSlot}>
      <div className={styles.timeSlot__list}>
        {weather.hourly.map((item) => {
          var hourTime = moment.unix(item.dt);
          return (
            <div className={styles.timeSlot__item}>
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

const UserCity = ({ weather }) => {
  return <button className={styles.badge}>{weather.timezone}</button>;
};

export default function Landing({ weather }) {
  let currentTemp = KelvinToCelcius(weather.current.temp);

  return (
    <div className={styles.container}>
      <div className={styles.tempCityContainer}>
        <div>
          <UserCity weather={weather} />
        </div>
        <div className={styles.currentTemp}>
          {currentTemp}
          <span className={styles.currentTemp__unit}>0C</span>
        </div>
      </div>
      <div className={styles.statusSelectorContainer}>
        <HourlyList weather={weather} />
      </div>
    </div>
  );
}
