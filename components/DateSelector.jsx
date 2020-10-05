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
    <div className="flex flex-column items-center md:mb-8">
      {dateOptions.map((option) => {
        let isActive = option.offset === selectedDay;
        return (
          <div
            key={option.offset}
            className={
              `ml-2 font-bold text-xs px-4 py-2 ` +
              (isActive
                ? "bg-black text-white border border-black rounded-full"
                : "")
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
