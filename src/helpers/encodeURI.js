export default (s) => {
    return encodeURIComponent(s).replace(/[!~*'()]/g, c => `%${c.charCodeAt(0).toString(16)}`);
}
