import { useEffect, useState } from "react";

export function DateDisplay({ date }) {
  const [dateMessage, setDateMessage] = useState("");

  useEffect(() => {
    if (date) {
      const Year = date.getFullYear();
      const Month = date.getMonth() + 1;
      const Day = date.getDate();
      const Hours = ("0" + date.getHours()).slice(-2);
      const Minutes = ("0" + date.getMinutes()).slice(-2);
      const dates =
        Year + "-" + Month + "-" + Day + " " + Hours + ":" + Minutes;
      setDateMessage(dates);
    }
  }, [date]);
  return <>{dateMessage}</>;
}