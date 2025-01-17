/**
 * Converts 12-hour time format to 24-hour time format.
 * @param {string} time - The time in 12-hour format (e.g., "9am", "12:30pm").
 * @returns {string} - The time in 24-hour format (e.g., "09:00:00", "12:30:00").
 * @throws {Error} - If the input time format is invalid.
 */
function convertTo24HourFormat(time) {
    const timeRegex = /(\d{1,2})(?::(\d{2}))?(?::(\d{2}))?([ap]m)/i;
    const match = time.match(timeRegex);

    if (!match) {
        throw new Error('Invalid time format');
    }

    let [ , hourStr, minute = '00', second = '00', period ] = match;
    let hour = parseInt(hourStr, 10);

    // Validate hour, minute, and second values
    if (hour < 1 || hour > 12 || parseInt(minute, 10) > 59 || parseInt(second, 10) > 59) {
        throw new Error('Invalid time format');
    }

    if (period.toLowerCase() === 'pm' && hour !== 12) {
        hour += 12;
    }
    if (period.toLowerCase() === 'am' && hour === 12) {
        hour = 0;
    }

    return `${String(hour).padStart(2, '0')}:${minute.padStart(2, '0')}:${second.padStart(2, '0')}`;
}

export { convertTo24HourFormat };
