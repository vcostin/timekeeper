const CHISINAU_OPTIONS = {
  timeZone: "Europe/Chisinau",
  hour12: false,
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

const formatToLocalTime = (isoString, options = CHISINAU_OPTIONS) => {
  return new Date(isoString).toLocaleString("en-GB", options);
};

export { CHISINAU_OPTIONS, formatToLocalTime };
