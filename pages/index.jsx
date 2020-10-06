import moment from "moment";
import axios from "axios";
import useSWR from "swr";

import styles from "../styles/Home.module.css";
import Landing from "../components/Landing.jsx";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Home() {
  const { data, error } = useSWR("/api/weather", (...args) =>
    axios(...args).then((res) => res.data)
  );
  if (error) return <div>Sorry, failed to determing your location.</div>;
  if (!data) return <LoadingSpinner size={14} />;
  return <Landing weather={data} />;
}
