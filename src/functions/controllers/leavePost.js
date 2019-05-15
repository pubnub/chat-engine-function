import validateChat from '../validate/chat';
import validateGlobal from '../validate/global';
import validateUUID from '../validate/uuid';
import rejectionResponse from '../responses/rejection';
import pubnub from 'pubnub';
export default (request, response) => {
    // removes a channel from a user's channel group so they stop receiving events
    return validateChat(request.body.chat)
	.then(() => validateGlobal(request.body.global))
	.then(() => validateUUID(request.body.uuid))
	.then(() => {
		const group = [request.body.global, request.body.uuid, request.body.chat.group].join('#');

		return pubnub.channelGroups.removeChannels({
			channels: [request.body.chat.channel],
			channelGroup: group,
			uuid: request.body.uuid
		}).then((respBody) => {
			if (respBody.error === true || respBody.status != 200) {
				response.status = 503;
			} else {
				respBody = undefined;
			}

			return response.send(respBody);
		});
    	});
}
