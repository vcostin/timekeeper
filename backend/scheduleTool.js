import { closeApp, openApp } from "./sysDenoProc.js";

const scheduleOpenSet = ({ name, url, comment }) => {
  console.log(
    `Setting schedule ${name} to open with the url: ${url}. Notes: ${comment}`,
  );
  return openApp(url);
};
const scheduleCloseSet = ({ name, url }) => {
  console.log(`Setting schedule ${name} to close with the url: ${url}.`);
  return closeApp(url);
};

const scheduleConvert = (schedule) => {
  const { openTime, closeTime, id, name, url, comment } = schedule;
  const openDate = new Date(openTime);
  const closeDate = new Date(closeTime);

  return {
    id,
    name,
    url,
    comment,
    openDate,
    closeDate,
  };
};

export { scheduleCloseSet, scheduleConvert, scheduleOpenSet };
