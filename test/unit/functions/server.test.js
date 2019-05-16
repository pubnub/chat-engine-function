const assert = require('chai').assert;
const Mock = require('pubnub-functions-mock');

const endpointResponseObject = {
    headers: {},
    status: 200,
    json: () => {
        return Promise.resolve(JSON.parse(this.body || null));
    },
    send: function (body) {
        return Promise.resolve({
            body: body || '',
            status: this.status
        });
    }
};

const endpointRequestObject = {
    body: '{}',
    message: {},
    method: 'GET',
    params: {},
    json: () => {
        return Promise.resolve(JSON.parse(this.body || null));
    }
};

describe('#chat engine server', () => {
    let server;

    // Overrides the default XHR and Crypto modules in all tests
    let xhr = {
        fetch: () => {

           let o = {
                status: 200
            }

            o.json = () => Promise.resolve(o);
            return Promise.resolve(o);

        }
    };

    let crypto = {
        hmac: () => {
            return Promise.resolve({ signature: 'signature' });
        },
        ALGORITHM: {
            HMAC_SHA256: ''
        }
    };

    let vault = {
        get: () => {
            return Promise.resolve('testSignature');
        }
    }

    beforeEach((done) => {
        server = Mock('./build/server.js', { xhr, crypto, vault });
        done();
    });

    it('creates server event handler of type Function', (done) => {
        assert.isFunction(server, 'was successfully created');
        done();
    });

    it('requests controllers.index.get', (done) => {

        let request = Object.assign({}, endpointRequestObject);
        let response = Object.assign({}, endpointResponseObject);

        let correctResult = {
            status: 404
        };

        server(request, response).then((testResult) => {

            assert.equal(testResult.status, correctResult.status, 'status');

            done();
        }).catch(done);

    });

    it('requests invalid route - should return 404', (done) => {

        let request = Object.assign({}, endpointRequestObject);
        let response = Object.assign({}, endpointResponseObject);
        request.params.route = 'invalid-route';

        let correctResult = { status: 404 };

        server(request, response).then((testResult) => {

            assert.equal(testResult.status, correctResult.status, 'status');

            done();
        }).catch(done);

    });

    it('requests controllers.user_read.post', (done) => {

        let request = Object.assign({}, endpointRequestObject);
        let response = Object.assign({}, endpointResponseObject);
        request.params.route = 'user_read';
        request.method = 'POST';
        request.body = JSON.stringify({
            global: 'test',
            uuid: '12345'
        });

        let correctResult = { status: 200 };

        server(request, response).then((testResult) => {
            assert.equal(testResult.status, correctResult.status, 'status');
            done();
        }).catch(done);

    });

    it('requests controllers.user_write.post', (done) => {

        let request = Object.assign({}, endpointRequestObject);
        let response = Object.assign({}, endpointResponseObject);
        request.params.route = 'user_write';
        request.method = 'POST';
        request.body = JSON.stringify({
            global: 'test',
            uuid: '12345'
        });

        let correctResult = { status: 200 };

        server(request, response).then((testResult) => {

            assert.equal(testResult.status, correctResult.status, 'status');

            done();
        }).catch(done);

    });

    it('requests controllers.bootstrap.post', (done) => {

        let request = Object.assign({}, endpointRequestObject);
        let response = Object.assign({}, endpointResponseObject);
        request.params.route = 'bootstrap';
        request.method = 'POST';
        request.body = JSON.stringify({
            global: 'test',
            authKey: '54321'
        });

        let correctResult = { status: 200 };

        server(request, response).then((testResult) => {

            assert.equal(testResult.status, correctResult.status, 'status');

            done();
        }).catch(done);

    });

    it('requests controllers.group.post', (done) => {

        let request = Object.assign({}, endpointRequestObject);
        let response = Object.assign({}, endpointResponseObject);
        request.params.route = 'group';
        request.method = 'POST';
        request.body = JSON.stringify({
            uuid: '12345',
            global: 'test',
            authKey: '54321'
        });

        let correctResult = { status: 200 };

        server(request, response).then((testResult) => {
            assert.equal(testResult.status, correctResult.status, 'status');
            done();
        }).catch(done);

    });

    it('requests controllers.join.post', (done) => {

        let request = Object.assign({}, endpointRequestObject);
        let response = Object.assign({}, endpointResponseObject);
        request.params.route = 'join';
        request.method = 'POST';
        request.body = JSON.stringify({
            global: 'test',
            uuid: 'test',
            chat: {
                channel: 'blah blah blah',
                private: false,
                group: 'custom',
                meta: {
                    works: true
                }
            }
        });

        let correctResult = { status: 200 };

        server(request, response).then((testResult) => {
            assert.equal(testResult.body.status, correctResult.status);
            done();
        }).catch(done);

    });

    it('requests controllers.leave.post', (done) => {

        let request = Object.assign({}, endpointRequestObject);
        let response = Object.assign({}, endpointResponseObject);
        request.params.route = 'leave';
        request.method = 'POST';
        request.body = JSON.stringify({
            global: 'test',
            uuid: 'test',
            chat: {
                channel: 'blah blah blah',
                private: false,
                group: 'custom',
                meta: {
                    works: true
                }
            }
        });

        let correctResult = { status: 200 };

        server(request, response).then((testResult) => {
            assert.equal(testResult.status, correctResult.status, 'status');
            done();
        }).catch(done);

    });

    it('requests controllers.chat.post', (done) => {

        let request = Object.assign({}, endpointRequestObject);
        let response = Object.assign({}, endpointResponseObject);
        request.params.route = 'chat';
        request.method = 'POST';
        request.body = JSON.stringify({
            chat: {
                channel: 'blah blah blah',
                private: false,
                group: 'custom',
                meta: {
                    works: true
                }
            }
        });

        let correctResult = { status: 200 };

        server(request, response).then((testResult) => {

            assert.equal(testResult.status, correctResult.status, 'status');

            done();
        }).catch(done);

    });

    it('requests controllers.chat.get', (done) => {

        let request = Object.assign({}, endpointRequestObject);
        let response = Object.assign({}, endpointResponseObject);
        request.params.route = 'chat';
        request.params.channel = 'blah blah blah';

        let correctResult = { status: 200 };

        server(request, response).then((testResult) => {

            assert.equal(testResult.status, correctResult.status, 'status');
            done();

        }).catch(done);

    });

    it('requests controllers.grant.post', (done) => {

        let request = Object.assign({}, endpointRequestObject);
        let response = Object.assign({}, endpointResponseObject);
        request.params.route = 'grant';
        request.method = 'POST';
        request.body = JSON.stringify({
            authKey: '54321',
            chat: {
                channel: 'blah blah blah',
                private: false,
                group: 'custom',
                meta: {
                    works: true
                }
            }
        });

        let correctResult = { status: 200 };

        server(request, response).then((testResult) => {

            assert.equal(testResult.status, correctResult.status, 'status');

            done();
        }).catch(done);

    });

    it('requests controllers.invite.post', (done) => {

        let request = Object.assign({}, endpointRequestObject);
        let response = Object.assign({}, endpointResponseObject);
        request.params.route = 'invite';
        request.method = 'POST';

        let correctResult = { status: 200 };

        server(request, response).then((testResult) => {

            assert.equal(testResult.status, correctResult.status, 'status');

            done();
        }).catch(done);

    });

    it('requests controllers.user_state.get', (done) => {

        let request = Object.assign({}, endpointRequestObject);
        let response = Object.assign({}, endpointResponseObject);

        request.params = {
            route: 'user_state',
            global: 'test',
            user: 'test'
        };

        let correctResult = { status: 200 };

        server(request, response).then((testResult) => {

            assert.equal(testResult.status, correctResult.status, 'status');

            done();
        }).catch(done);

    });

    it('requests auth invite', (done) => {

        let request = Object.assign({}, endpointRequestObject);
        let response = Object.assign({}, endpointResponseObject);

        let testChannel = 'testChannel';
        let testUuid = 'testUuid';

        let proxyBody = JSON.stringify({
            chat: {
                private: true,
                channel: testChannel
            },
            uuid: testUuid
        });

        request.body = JSON.stringify({
            body: proxyBody
        });

        request.method =  'POST';
        request.params.route = 'invite';

        let preExistingValue = {};

        preExistingValue['authed:' + testChannel] = [testUuid];

        server.mockKVStoreData(preExistingValue);

        let correctResult = {
            status: 200
        };

        server(request, response).then((testResult) => {

            assert.equal(testResult.status, correctResult.status, 'status');

            done();
        }).catch(done);

    });

    it('requests auth invite unauthorized', (done) => {

        let request = Object.assign({}, endpointRequestObject);
        let response = Object.assign({}, endpointResponseObject);

        let testChannel = 'testChannel';
        let testUuid = 'testUuid';
        let wrongUuid = 'wrongUuid';

        let proxyBody = JSON.stringify({
            chat: {
                private: true,
                channel: testChannel
            },
            uuid: testUuid
        });

        request.body = JSON.stringify({
            body: proxyBody
        });

        request.method =  'POST';
        request.params.route = 'invite';

        let preExistingValue = {};

        preExistingValue['authed:' + testChannel] = [wrongUuid];

        server.mockKVStoreData(preExistingValue);

        let correctResult = {
            status: 200
        };

        server(request, response).then((testResult) => {

            assert.equal(testResult.status, correctResult.status, 'status');

            done();
        }).catch(done);

    });

    it('requests auth invite not private', (done) => {

        let request = Object.assign({}, endpointRequestObject);
        let response = Object.assign({}, endpointResponseObject);
        let proxyBody = JSON.stringify({
            chat: {}
        });

        request.body = JSON.stringify({
            body: proxyBody
        });

        request.method =  'POST';
        request.params.route = 'invite';

        let correctResult = {
            status: 200
        };

        server(request, response).then((testResult) => {

            assert.equal(testResult.status, correctResult.status, 'status');

            done();
        }).catch(done);

    });

    it('requests auth grant', (done) => {

        let request = Object.assign({}, endpointRequestObject);
        let response = Object.assign({}, endpointResponseObject);

        let testChannel = 'testChannel';
        let testUuid = 'testUuid';

        let proxyBody = JSON.stringify({
            chat: {
                private: true,
                channel: testChannel
            },
            uuid: testUuid
        });

        request.body = JSON.stringify({
            body: proxyBody
        });

        request.method =  'POST';
        request.params.route = 'invite';

        let preExistingValue = {};

        preExistingValue['authed:' + testChannel] = [testUuid];

        server.mockKVStoreData(preExistingValue);

        let correctResult = {
            status: 200
        };

        server(request, response).then((testResult) => {

            assert.equal(testResult.status, correctResult.status, 'status');

            done();
        }).catch(done);

    });

    it('requests auth grant unauthorized', (done) => {

        let request = Object.assign({}, endpointRequestObject);
        let response = Object.assign({}, endpointResponseObject);

        let testChannel = 'testChannel';
        let testUuid = 'testUuid';
        let wrongUuid = 'wrongUuid';

        let proxyBody = JSON.stringify({
            chat: {
                private: true,
                channel: testChannel
            },
            uuid: testUuid
        });

        request.body = JSON.stringify({
            body: proxyBody
        });

        request.method =  'POST';
        request.params.route = 'grant';

        let preExistingValue = {};

        preExistingValue['authed:' + testChannel] = [wrongUuid];

        server.mockKVStoreData(preExistingValue);

        let correctResult = {
            status: 401
        };

        server(request, response).then((testResult) => {
            assert.equal(testResult.status, correctResult.status, 'status');

            done();
        }).catch(done);

    });

    it('requests auth grant not private', (done) => {

        let request = Object.assign({}, endpointRequestObject);
        let response = Object.assign({}, endpointResponseObject);
        let proxyBody = JSON.stringify({
            chat: {}
        });

        request.body = JSON.stringify({
            body: proxyBody
        });

        request.method =  'POST';
        request.params.route = 'invite';

        let correctResult = {
            status: 200
        };

        server(request, response).then((testResult) => {

            assert.equal(testResult.status, correctResult.status, 'status');

            done();
        });

    });

    it('requests auth invalid route', (done) => {

        let request = Object.assign({}, endpointRequestObject);
        let response = Object.assign({}, endpointResponseObject);
        request.body = JSON.stringify({
            body: '""',
            params: {
                route: ''
            }
        });

        let correctResult = {
            status: 404
        };

        server(request, response).then((testResult) => {
            assert.equal(testResult.status, correctResult.status, 'status');

            done();
        });

    });

});
