import moment from "moment";
import styles from "./HourlyList.module.scss";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { KelvinToCelcius } from "../utils";

const HourlyList = ({ hourly, selectCurrentTimeSlot, currentDt }) => {
  return (
    <div className={styles.timeSlot}>
      <div className={styles.timeSlot__list}>
        <TransitionGroup exit={false} component={null}>
          {hourly.map((item) => {
            var hourTime = moment.unix(item.dt);
            return (
              <CSSTransition key={item.dt} timeout={1000} classNames="fade">
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
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </div>
    </div>
  );
};

export default HourlyList;
