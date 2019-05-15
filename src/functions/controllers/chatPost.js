import config from '../config';
import kvstore from 'kvstore';
import keyChatMeta from '../helpers/keyChatMeta';
import validateChat from '../validate/chat';

export default (request, response) => {
    // sets metadata a chat in the kv store
    return validateChat(request.body.chat).then(() => {
      return kvstore.set(keyChatMeta(request.body.chat.channel), request.body.chat, config.STATE_TTL)
          .then(() => response.send());
    });
}
