import config from '../config';
import pubnub from 'pubnub';
import validateChat from '../validate/chat';
import validateAuthKey from '../validate/authKey';
import grantResponse from '../responses/grant';

export default (request, response) => {
    // grants a user access to a new chat
    return validateChat(request.body.chat)
        .then(() => validateAuthKey(request.body.authKey))
        .then(() => {
            return pubnub.grant({
                channels: [request.body.chat.channel, `${request.body.chat.channel}-pnpres`],
                read: true,
                write: true,
                authKeys: [request.body.authKey],
                ttl: config.GRANT_TTL
            }).then((status) => grantResponse(response, status));
        });
}
