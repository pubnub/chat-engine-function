import config from '../config';
import kvstore from 'kvstore';
import keyUserState from '../helpers/keyUserState';
import validateChannel from '../validate/channel';
import validateUUID from '../validate/uuid';

export default (request, response) => {
    // set user state in the kv store
    // this is only called by PubNub webhooks
    return validateChannel(request.params.channel)
        .then(() => validateUUID(request.body.uuid))
        .then(() => {
            const key = keyUserState(request.body.channel, request.body.uuid);

            return kvstore.set(key, request.body.data, config.STATE_TTL)
                .then(() => {
                    response.send();
                });

        });
}
