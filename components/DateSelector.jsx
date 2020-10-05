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
    <div className="flex flex-column items-center self-center lg:self-start lg:mb-8">
      {dateOptions.map((option) => {
        let isActive = option.offset === selectedDay;
        return (
          <div
            key={option.offset}
            className={
              `ml-2 font-bold text-xs px-4 py-2 ` +
              (isActive ? "border border-black rounded-full" : "")
            }
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
