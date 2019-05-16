import queryStringCodec from "codec/query_string";

export default (options, signature) => {
  return queryStringCodec.stringify(Object.assign(options, { signature }));
};
