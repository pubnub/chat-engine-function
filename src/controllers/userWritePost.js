import config from "../config";
import pubnub from "pubnub";
import validateGlobal from "../validate/global";
import validateUUID from "../validate/uuid";
import grantResponse from "../responses/grant";

export default (request, response) => {
  // grants everybody permissions on this user's direct channel
  return validateGlobal(request.body.global)
    .then(() => validateUUID(request.body.uuid))
    .then(() => {
      const chanEverybodyW = [
        `${request.body.global}#user:${request.body.uuid}#write.*`
      ];

      return pubnub
        .grant({
          channels: chanEverybodyW,
          write: true, // false to disallow
          read: false,
          ttl: config.GRANT_TTL
        })
        .then(status => grantResponse(response, status));
    });
};
