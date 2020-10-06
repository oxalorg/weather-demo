import styles from "./LoadingSpinner.module.scss";

const LoadingSpinner = ({ size }) => {
  let pxSize = size ? `${size}px` : "11px";
  return <div className={styles.loader} style={{ fontSize: pxSize }}></div>;
};
export default LoadingSpinner;
