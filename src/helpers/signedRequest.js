import vault from 'vault';
import crypto from 'crypto';
import xhr from 'xhr';
import base64Codec from 'codec/base64';

import applySignature from '../helpers/applySignature';
import encodeURI from '../helpers/encodeURI';

export default (request, path, options = {}) => {

    // signs a secure request for the PubNub API
    options.timestamp = Math.floor(Date.now() / 1000);

    const params = Object.keys(options).sort().map(k => `${encodeURI(k)}=${encodeURI(options[k])}`).join('&');

    const signString = `${request.subkey}\n${request.pubkey}\n${path}\n${params}`;

    const pnUrl = 'https://ps.pndsn.com';
    // const pnUrl = 'http://balancer1g.bronze.aws-pdx-1.ps.pn';

    return vault.get('secretKey') // get the PubNub account secret key from PubNub vault
        .then((secretKey) => crypto.hmac(base64Codec.btoa(secretKey), signString, crypto.ALGORITHM.HMAC_SHA256))
        .then((signature) => xhr.fetch(`${pnUrl}${path}?${applySignature(options, signature)}`));

}
