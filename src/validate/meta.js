import rejectionResponse from "../responses/rejection";

export default (data = false) => {
  if (typeof data !== "object") {
    return rejectionResponse(401, "Invalid meta object supplied.");
  }

  return Promise.resolve();
};
