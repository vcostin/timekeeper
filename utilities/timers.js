import { internallAppLog } from "./message.js";

const timers = new Map();
const MAX_TIMEOUT = 2147483647; // Maximum delay for setTimeout (approximately 24.8 days)

// Function to set a timer for a specific schedule
function setTimer(scheduleId, targetDate, datePurpose, callback) {
  const currentDate = new Date();
  const timeDifference = targetDate - currentDate;

  if (timeDifference < 0) {
    internallAppLog(
      `The target date for schedule ${scheduleId} is in the past!`,
    );
    return;
  }

  const setLongTimeout = (delay) => {
    if (delay > MAX_TIMEOUT) {
      return setTimeout(() => {
        setLongTimeout(delay - MAX_TIMEOUT);
      }, MAX_TIMEOUT);
    } else {
      return setTimeout(callback, delay);
    }
  };

  const timerId = setLongTimeout(timeDifference);

  if (!timers.has(scheduleId)) {
    timers.set(scheduleId, []);
  }
  timers.get(scheduleId).push({ timerId, datePurpose });
}

// Function to clear all timers for a specific schedule
function clearTimers(scheduleId) {
  if (timers.has(scheduleId)) {
    timers.get(scheduleId).forEach(({ timerId }) => clearTimeout(timerId));
    timers.delete(scheduleId);
  }
}

// Function to clear all existing timers
function clearAll() {
  timers.forEach((timerInfos, _scheduleId) => {
    timerInfos.forEach(({ timerId }) => clearTimeout(timerId));
  });
  timers.clear();
}

// Function to update a timer for a specific schedule and date purpose
function updateTimer(scheduleId, targetDate, datePurpose, callback) {
  if (timers.has(scheduleId)) {
    const timerInfos = timers.get(scheduleId);
    const timerInfoIndex = timerInfos.findIndex((info) =>
      info.datePurpose === datePurpose
    );

    if (timerInfoIndex !== -1) {
      clearTimeout(timerInfos[timerInfoIndex].timerId);
      timerInfos.splice(timerInfoIndex, 1);
    }

    setTimer(scheduleId, targetDate, datePurpose, callback);
  } else {
    setTimer(scheduleId, targetDate, datePurpose, callback);
  }
}

function getTimers() {
  return timers;
}

// Example usage
// const scheduleId1 = "schedule1";
// const scheduleId2 = "schedule2";

//  setTimer(scheduleId1, new Date("2025-03-15T10:00:00"), "openTime", () => {
// });

//  clearTimers(scheduleId1);

// setTimer(scheduleId2, new Date("2025-01-16T10:00:00"), "closeTime", () => {
// });

// To update a timer for a specific schedule and date purpose
// updateTimer(scheduleId1, new Date("2025-01-15T12:00:00"), "openTime", () => {
// });

// To clear timers for a specific schedule
// clearTimers(scheduleId1);

// To clear all timers
// clearAll();

export { clearAll, clearTimers, getTimers, setTimer, timers, updateTimer };
