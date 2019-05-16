export default route => {
  // Allows you to set custom logic to accept or reject different kinds of
  // requests based on the route and given parameters or request.body. Always
  // return a promise with `Promise.resolve({ status })`
  let status = 404;

  switch (route) {
    case "invite": // can this user invite?
    case "grant": // is this user allowed in the channel they're trying to join?
      return Promise.resolve();
      break;
    default:
      // all other requests
      return Promise.resolve();
      break;
  }
};
