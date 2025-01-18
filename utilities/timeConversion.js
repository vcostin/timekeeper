import { convertTo24HourFormat } from "./12to24convert.js";

const TIMEZONE_OFFSET = "-0400"; // Eastern Time (ET) offset

const parseInput = (input) => {
  const datePart = input.split(" @ ")[0].split(", ")[1].trim();
  const timePart = input.split(" @ ")[1].replace(" ET", "").trim();
  const [month, date] = datePart.split(" ");
  const [startTime, endTime] = timePart.split(" - ");
  return { month, date, startTime, endTime };
};

const convertToISO = (time, year, month, date) => {
  return new Date(`${year} ${month} ${date} ${time} ${TIMEZONE_OFFSET}`).toISOString();
};

const convertTimesToISO = (input) => {
  const { month, date, startTime, endTime } = parseInput(input);
  const year = new Date().getFullYear(); // Use the current year
  const startTimeISO = convertToISO(convertTo24HourFormat(startTime), year, month, date);
  const endTimeISO = convertToISO(convertTo24HourFormat(endTime), year, month, date);
  return { startTimeISO, endTimeISO };
};

export { convertTimesToISO, parseInput, convertToISO };
