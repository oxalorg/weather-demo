import styles from "./DateSelector.module.scss";

const DateSelector = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item__active + " " + styles.item}>Today</div>
      <div className={styles.item}>Tomorrow</div>
    </div>
  );
};

export default DateSelector;
