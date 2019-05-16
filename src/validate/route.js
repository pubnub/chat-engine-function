import rejectionResponse from "../responses/rejection";

export default (controllers, route, method) => {
  if (!controllers[route]) {
    return rejectionResponse(404, "Invalid route");
  }

  if (!controllers[route][method]) {
    return rejectionResponse(404, "Invalid method");
  }

  return Promise.resolve();
};
