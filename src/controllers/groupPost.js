import config from "../config";
import pubnub from "pubnub";
import validateGlobal from "../validate/global";
import validateUUID from "../validate/uuid";
import validateAuthKey from "../validate/authKey";
import validateChannel from "../validate/channel";
import grantResponse from "../responses/grant";
import rejectionResponse from "../responses/rejection";

export default (request, response) => {
  // grants user access to their channel groups
  return validateGlobal(request.body.global)
    .then(() => validateUUID(request.body.uuid))
    .then(() => validateAuthKey(request.body.authKey))
    .then(() => {
      const groups = [
        `${request.body.global}#${request.body.uuid}#rooms`,
        `${request.body.global}#${request.body.uuid}#rooms-pnpres`,
        `${request.body.global}#${request.body.uuid}#system`,
        `${request.body.global}#${request.body.uuid}#system-pnpres`,
        `${request.body.global}#${request.body.uuid}#custom`,
        `${request.body.global}#${request.body.uuid}#custom-pnpres`
      ];

      // Ensure channel group length not greater than 90 chars
      groups.forEach(group => {
        if (!validateChannel(group)) {
          response.status = 401;
          return response.send({
            error: `Illegal channel length! Please shorten channel name to meet 90 char limit.`,
            channel: group,
            length: group.length
          });
        }
      });

      return pubnub
        .grant({
          channelGroups: groups,
          read: true, // false to disallow
          authKeys: [request.body.authKey],
          ttl: config.GRANT_TTL
        })
        .then(status => grantResponse(response, status));
    });
};
