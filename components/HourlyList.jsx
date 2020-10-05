import styles from "./HourlyList.module.scss";

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

export default HourlyList;
