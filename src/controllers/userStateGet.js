import GRANT_TTL from '../config';
import kvstore from 'kvstore';
import keyUserState from '../helpers/keyUserState';
import validateGlobal from '../validate/global';
import validateUUID from '../validate/uuid';

export default (request, response) => {
    // retrieve the user state from the kv store
    return validateGlobal(request.params.global)
        .then(() => validateUUID(request.params.user))
        .then(() => {

            const key = keyUserState(request.params.global, request.params.user);

            return kvstore.get(key).then((state) => {
                return response.send(state || {});
            });
        });
}
