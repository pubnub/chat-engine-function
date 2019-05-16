export default (status, message) => {
    return Promise.reject({
      status: status || 401,
      message: message || 'A parameter was invalid.'
    });
}
