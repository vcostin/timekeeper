const timers = new Map();

// Function to set a timer for a specific schedule
function setTimer(scheduleId, targetDate, callback) {
  const currentDate = new Date();
  const timeDifference = targetDate - currentDate;

  if (timeDifference > 0) {
    const timerId = setTimeout(callback, timeDifference);

    if (!timers.has(scheduleId)) {
      timers.set(scheduleId, []);
    }
    timers.get(scheduleId).push(timerId);
  } else {
    console.log(`The target date for schedule ${scheduleId} is in the past!`);
  }
}

// Function to clear all timers for a specific schedule
function clearTimers(scheduleId) {
  if (timers.has(scheduleId)) {
    timers.get(scheduleId).forEach(clearTimeout);
    timers.delete(scheduleId);
  }
}

// Example usage
// const scheduleId1 = "schedule1";
// const scheduleId2 = "schedule2";

// setTimer(scheduleId1, new Date("2025-01-15T10:00:00"), () => {
//   console.log(`The specific time for schedule ${scheduleId1} has arrived!`);
// });
// setTimer(scheduleId2, new Date("2025-01-16T10:00:00"), () => {
//   console.log(`The specific time for schedule ${scheduleId2} has arrived!`);
// });

// To clear timers for a specific schedule
// clearTimers(scheduleId1);

export { setTimer, clearTimers, timers };
