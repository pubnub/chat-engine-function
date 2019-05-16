import validateChat from "../validate/chat";
import validateGlobal from "../validate/global";
import validateUUID from "../validate/uuid";
import pubnub from "pubnub";
import rejectionResponse from "../responses/rejection";

export default (request, response) => {
  // adds a chat channel to user's channel group so they can start chatting
  return validateChat(request.body.chat)
    .then(() => validateGlobal(request.body.global))
    .then(() => validateUUID(request.body.uuid))
    .then(() => {
      const group = [
        request.body.global,
        request.body.uuid,
        request.body.chat.group
      ].join("#");

      return pubnub.channelGroups
        .addChannels({
          channels: [request.body.chat.channel],
          channelGroup: group,
          uuid: request.body.uuid
        })
        .then(respBody => {
          if (respBody.error === true || respBody.status != 200) {
            return rejectionResponse(503, "join request");
          }

          return response.send(respBody);
        });
    });
};
