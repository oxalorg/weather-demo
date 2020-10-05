import styles from "./DateSelector.module.scss";

const dateOptions = [
  {
    label: "Today",
    offset: 0,
  },
  {
    label: "Tomorrow",
    offset: 1,
  },
];

const DateSelector = ({ selectedDay, setSelectedDay }) => {
  return (
    <div className={styles.container}>
      {dateOptions.map((option) => {
        let isActive = option.offset === selectedDay;
        return (
          <div
            key={option.offset}
            className={isActive ? styles.item__active : styles.item}
            onClick={(e) => {
              e.preventDefault();
              setSelectedDay(option.offset);
            }}
          >
            {option.label}
          </div>
        );
      })}
    </div>
  );
};

export default DateSelector;
