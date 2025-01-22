const timers = new Map();

// Function to set a timer for a specific schedule
function setTimer(scheduleId, targetDate, datePurpose, callback) {
  const currentDate = new Date();
  const timeDifference = targetDate - currentDate;

  if (timeDifference > 0) {
    const timerId = setTimeout(callback, timeDifference);

    if (!timers.has(scheduleId)) {
      timers.set(scheduleId, []);
    }
    timers.get(scheduleId).push({ timerId, datePurpose });
  } else {
    console.log(`The target date for schedule ${scheduleId} is in the past!`);
  }
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

// Example usage
// const scheduleId1 = "schedule1";
// const scheduleId2 = "schedule2";

// setTimer(scheduleId1, new Date("2025-01-15T10:00:00"), "openTime", () => {
//   console.log(`The open time for schedule ${scheduleId1} has arrived!`);
// });
// setTimer(scheduleId2, new Date("2025-01-16T10:00:00"), "closeTime", () => {
//   console.log(`The close time for schedule ${scheduleId2} has arrived!`);
// });

// To update a timer for a specific schedule and date purpose
// updateTimer(scheduleId1, new Date("2025-01-15T12:00:00"), "openTime", () => {
//   console.log(`The updated open time for schedule ${scheduleId1} has arrived!`);
// });

// To clear timers for a specific schedule
// clearTimers(scheduleId1);

// To clear all timers
// clearAll();

export { clearAll, clearTimers, setTimer, timers, updateTimer };
