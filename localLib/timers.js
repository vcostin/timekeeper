// Function to be executed at the specific date and time
function executeAtSpecificTime() {
  console.log("The specific time has arrived!");
}

// Target date and time
const targetDate = new Date("2025-01-15T10:00:00"); // Example: January 15, 2025, 10:00 AM

// Current date and time
const currentDate = new Date();

// Calculate the difference in milliseconds
const timeDifference = targetDate - currentDate;

// Check if the target date is in the future
if (timeDifference > 0) {
  setTimeout(executeAtSpecificTime, timeDifference);
} else {
  console.log("The target date is in the past!");
}
