const internallAppLog = (message) => {
  console.log(message);
};

const internallAppError = (message) => {
  console.error(message);
};

export { internallAppError, internallAppLog };
