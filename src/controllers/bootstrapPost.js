import config from "../config";
import validateGlobal from "../validate/global";
import validateAuthKey from "../validate/authKey";
import grantResponse from "../responses/grant";
import pubnub from "pubnub";

export default (request, response) => {
  // grants user full access to the global chat and their own channels
  return validateGlobal(request.body.global)
    .then(() => validateAuthKey(request.body.authKey))
    .then(() => {
      const chanMeRW = [
        request.body.global,
        request.body.global + "-pnpres",
        request.body.global + "#chat#public.*",
        request.body.global + "#user#" + request.body.uuid + "#me.*",
        request.body.global + "#user#" + request.body.uuid + "#read.*",
        request.body.global + "#user#" + request.body.uuid + "#write.*"
      ];

      return pubnub
        .grant({
          channels: chanMeRW,
          read: true, // false to disallow
          write: true, // false to disallow,
          authKeys: [request.body.authKey],
          ttl: config.GRANT_TTL
        })
        .then(status => grantResponse(response, status));
    });
};
