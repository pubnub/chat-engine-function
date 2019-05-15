import rejectionResponse from '../responses/rejection';

export default (uuid = false) => {

    if (typeof uuid !== 'string') {
      return rejectionResponse(401, 'UUID must be a string');
    }

    return Promise.resolve();
}
