import { convertTo24HourFormat } from "./12to24convert.js";

const input = "Friday, Oct 18 @ 9am - 11am ET";
const datePart = input.split(" @ ")[0].split(", ")[1].trim();
const timePart = input.split(" @ ")[1].replace(" ET", "").trim();

const [month, date] = datePart.split(" ");
const [startTime, endTime] = timePart.split(" - ");

const year = new Date().getFullYear(); // Use the current year


const convertToISO = (time) => {
  return new Date(`${year} ${month} ${date} ${time} -0400`).toISOString();
};

const startTimeISO = convertToISO(convertTo24HourFormat(startTime));
const endTimeISO = convertToISO(convertTo24HourFormat(endTime));

console.log("ISO format:", startTimeISO, "to", endTimeISO);

// Now convert ISO to local time (Chișinău)
const options = {
  timeZone: "Europe/Chisinau",
  hour12: false,
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

const startTimeChisinau = new Date(startTimeISO).toLocaleString(
  "en-GB",
  options
);
const endTimeChisinau = new Date(endTimeISO).toLocaleString("en-GB", options);

console.log("Local format:", startTimeChisinau, "to", endTimeChisinau);
