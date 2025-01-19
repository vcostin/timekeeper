const timers = new Map();

// Function to be executed at the specific date and time
function executeAtSpecificTime(scheduleId) {
  console.log(`The specific time for schedule ${scheduleId} has arrived!`);
}

// Function to set a timer for a specific schedule
function setTimer(scheduleId, targetDate) {
  const currentDate = new Date();
  const timeDifference = targetDate - currentDate;

  if (timeDifference > 0) {
    const timerId = setTimeout(
      () => executeAtSpecificTime(scheduleId),
      timeDifference,
    );

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
const scheduleId1 = "schedule1";
const scheduleId2 = "schedule2";

setTimer(scheduleId1, new Date("2025-01-15T10:00:00"));
setTimer(scheduleId2, new Date("2025-01-16T10:00:00"));

// To clear timers for a specific schedule
// clearTimers(scheduleId1);
