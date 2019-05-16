export default (channel, uuid) => {
  // generate kv key name for user state
  return `${channel}:${uuid}:state`;
};
