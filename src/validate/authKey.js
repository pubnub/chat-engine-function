import rejectionResponse from "../responses/rejection";

export default (authKey = false) => {
  if (typeof authKey !== "string") {
    return rejectionResponse(401, "authKey must be a string");
  }

  return Promise.resolve();
};
