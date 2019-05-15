import keyChatMeta from '../helpers/keyChatMeta';
import validateChannel from '../validate/channel';
import kvstore from 'kvstore'

export default (request, response) => {
    // retrieves metadata for a chat from the kv store
    return validateChannel(request.params.channel).then(() => {
        return kvstore.get(keyChatMeta(request.params.channel)).then((chat) => response.send({
            found: chat !== null,
            chat,
        }));

    });
}
