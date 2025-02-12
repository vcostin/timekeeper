import { convertTo24HourFormat } from "./12to24convert.js";

const TIMEZONE_OFFSET = "-0500"; // Eastern Time (ET) offset

// Example helper to remove ordinal suffixes
const removeOrdinal = (day) => day.replace(/(st|nd|rd|th)/i, "");

const parseInput = (input) => {
  // Expects format: "February 15th from 1pm to 3pm ET"
  const regex =
    /^(?<month>\w+)\s+(?<day>\d{1,2}(?:st|nd|rd|th)?)\s+from\s+(?<startTime>[^ ]+)\s+to\s+(?<endTime>[^ ]+)\s+ET$/i;
  const match = input.match(regex);
  if (!match) {
    throw new Error("Invalid time format");
  }
  const { month, day, startTime, endTime } = match.groups;
  return {
    month,
    day: removeOrdinal(day),
    startTime,
    endTime,
  };
};

const convertToISO = (time, year, month, day) => {
  return new Date(`${year} ${month} ${day} ${time} ${TIMEZONE_OFFSET}`)
    .toISOString();
};

const convertTimesToISO = (input) => {
  const { month, day, startTime, endTime } = parseInput(input);
  const year = new Date().getFullYear(); // Use the current year
  const startTimeISO = convertToISO(
    convertTo24HourFormat(startTime),
    year,
    month,
    day,
  );
  const endTimeISO = convertToISO(
    convertTo24HourFormat(endTime),
    year,
    month,
    day,
  );
  return { startTimeISO, endTimeISO };
};

const formatDateForInput = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export { convertTimesToISO, convertToISO, formatDateForInput, parseInput };
