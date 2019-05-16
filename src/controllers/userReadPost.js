import config from '../config';
import pubnub from 'pubnub';
import validateGlobal from '../validate/global';
import validateUUID from '../validate/uuid';
import grantResponse from '../responses/grant';

export default (request, response) => {
    // grants everybody permissions on this user's feed channel
    return validateGlobal(request.body.global)
        .then(() => validateUUID(request.body.uuid))
        .then(() => {
            const chanEverybodyR = [`${request.body.global}#user:${request.body.uuid}#read.*`];

            return pubnub.grant({
                channels: chanEverybodyR,
                read: true, // false to disallow
                write: false,
                ttl: config.GRANT_TTL
            }).then((status) => grantResponse(response, status));
        });

}
