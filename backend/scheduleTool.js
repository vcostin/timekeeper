import { internallAppLog } from "../utilities/message.js";
import { closeApp, openApp } from "./sysDenoProc.js";

const setScheduleOpen = ({ name, url, comment }) => {
  internallAppLog(
    `Setting schedule ${name} to open with the url: ${url}. Notes: ${comment}`,
  );
  return openApp(url);
};
const setScheduleClose = ({ name, url }) => {
  internallAppLog(`Setting schedule ${name} to close with the url: ${url}.`);
  return closeApp(url);
};

const scheduleConvert = (schedule) => {
  const { openTime, closeTime, id, name, url, comment } = schedule;

  return {
    id,
    name,
    url,
    comment,
    openTime: new Date(openTime),
    closeTime: new Date(closeTime),
  };
};

export { setScheduleClose, scheduleConvert, setScheduleOpen };
