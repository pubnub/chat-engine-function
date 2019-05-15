import rejectionResponse from '../responses/rejection';

export default (channel = false) => {

    if (typeof channel !== 'string') {
        return rejectionResponse(401, 'Chat channel must be a string');
    }

    /*
        Currently there exists a hard coded limit for channelGroup channel lengths
        limited to 97 characters. Here we will cap the limit @ 90 characters for a
        a legal channel length. Warnings emitting to console.log when within 10 chars.
    */
    if (!channel || !channel.length) {
        return rejectionResponse(401, 'Channel not supplied');
    }

    if (channel.length > 97) {
        return rejectionResponse(401, 'Channel too long');
    }

    return Promise.resolve();

}
