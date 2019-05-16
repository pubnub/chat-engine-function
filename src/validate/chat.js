import rejectionResponse from '../responses/rejection';

import validateMeta from '../validate/meta';
import validateChannel from '../validate/channel';

export default (chat = {}) => {

    if (!chat) {
        return rejectionResponse(401, 'Must supply a chat.');
    }

    if (![true, false].includes(chat.private)) {
        return rejectionResponse(401, 'Must supply a chat isPrivate value.');
    }

    if (!["rooms", "system", "custom"].includes(chat.group)) {
        return rejectionResponse(401, 'Must supply a chat group.');
    }

    return validateChannel(chat.channel).then(() => validateMeta(chat.meta));

}
