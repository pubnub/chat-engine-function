import chai from 'chai';
import authKey from '../../src/functions/validate/authKey';
import channel from '../../src/functions/validate/channel';
import chat from '../../src/functions/validate/chat';
import global from '../../src/functions/validate/global';
import route from '../../src/functions/validate/route';
import uuid from '../../src/functions/validate/uuid';

const assert = chai.assert;

describe('validators',() => {
    describe('#authKey', () => {
        it('should be valid', (done) => {
            authKey('jah1771711uaaa')
                .then(done)
                .catch(err => {
                    assert.deepEqual(err, null);
                    done();
                });
        });

        it('should not be invalid', (done) => {
            authKey(123456)
                .then(() => {
                    assert.isOk(false);
                    done();
                })
                .catch(err => {
                    const expected = { status: 401, message: 'authKey must be a string' };
                    assert.deepEqual(err, expected);
                    done();
                });
        });
    });

    describe('#channel', () => {
        it('should be valid', (done) => {
            channel('ch1')
                .then(done)
                  .catch(err => {
                    assert.deepEqual(err, null);
                    done();
                });
        });

        it('should not be empty', (done) => {
            channel()
                .then(() => {
                    assert.isOk(false);
                    done();
                })
                .catch(err => {
                    const expected = { status: 401, message: 'Chat channel must be a string' };
                    assert.deepEqual(err, expected);
                    done();
                });
        });

        it('should not be too long', (done) => {
            const ch1 = 'aswakkakakkskakaaasasaslkkakakaaasaaaaiaakakakazkakakbbbakwkakakakw00e00a0a0a0alslallalammaiwkkakakaka';

            channel(ch1)
                .then(() => {
                    assert.isOk(false);
                    done();
                })
                .catch(err => {
                    const expected = { status: 401, message: 'Channel too long' };
                    assert.deepEqual(err, expected);
                    done();
                });
        });
    });

    describe('#chat', () => {
        it('should be valid', (done) => {
            const myChat = { channel: 'ch1', group: 'custom', private: true, meta: {} };

            chat(myChat)
                .then(done)
                .catch(err => {
                    assert.deepEqual(err, null);
                    done();
                });
        });

        it('should not be empty', (done) => {
            chat(null)
                .then(() => {
                    assert.isOk(false);
                    done();
                })
                .catch(err => {
                    const expected = { status: 401, message: 'Must supply a chat.' };
                    assert.deepEqual(err, expected);
                    done();
                });
        });

        it('should be private equal to (true or false)', (done) => {
            const myChat = { channel: 'ch1', private: 'private', group: 'custom', meta: {} };

              chat(myChat)
                  .then(done)
                  .catch(err => {
                      const expected = { status: 401, message: 'Must supply a chat isPrivate value.' };
                    assert.deepEqual(err, expected);
                      done();
                  });
        });

        it('should be group equal to (rooms, system, custom)', (done) => {
            const myChat = { channel: 'ch1', private: false, group: 'mygroup', meta: {} };

            chat(myChat)
                .then(done)
                .catch(err => {
                    const expected = { status: 401, message: 'Must supply a chat group.' };
                    assert.deepEqual(err, expected);
                    done();
                });
        });

        it('should be included a meta object', (done) => {
            const myChat = { channel: 'ch1', private: false, group: 'custom' };

            chat(myChat)
                .then(done)
                .catch(err => {
                    const expected = { status: 401, message: 'Invalid meta object supplied.' };
                    assert.deepEqual(err, expected);
                    done();
                });
        });
    });

    describe('#global', () => {
        it('should validate a globalChannel for public chat', (done) => {
            global('chat#public')
                .then(done)
                .catch(err => {
                    assert.deepEqual(err, null);
                    done();
                });
        });

        it('should validate a globalChannel for private chat', (done) => {
            global('chat#private')
                .then(done)
                .catch(err => {
                    assert.deepEqual(err, null);
                    done();
                });
        });

        it('should validate a globalChannel for reading user', (done) => {
            global('user#MYUUID#read')
                .then(done)
                .catch(err => {
                    assert.deepEqual(err, null);
                    done();
                });
        });

      it('should validate a globalChannel for writing user', (done) => {
          global('user#MYUUID#write')
              .then(done)
              .catch(err => {
                  assert.deepEqual(err, null);
                  done();
              });
      });

      it('should validate a globalChannel for rooms', (done) => {
          global('MYUUID#rooms')
              .then(done)
              .catch(err => {
                  assert.deepEqual(err, null);
                  done();
              });
      });

      it('should validate a globalChannel for rooms-pnpres', (done) => {
        global('MYUUID#rooms-pnpres')
            .then(done)
            .catch(err => {
                assert.deepEqual(err, null);
                done();
            });
      });

      it('should validate a globalChannel for system', (done) => {
        global('MYUUID#system')
            .then(done)
            .catch(err => {
                assert.deepEqual(err, null);
                done();
            });
      });

      it('should validate a globalChannel for system-pnpres', (done) => {
        global('MYUUID#system-pnpres')
            .then(done)
            .catch(err => {
                assert.deepEqual(err, null);
                done();
            });
      });

      it('should validate a globalChannel for custom', (done) => {
          global('MYUUID#custom')
              .then(done)
              .catch(err => {
                  assert.deepEqual(err, null);
                  done();
              });
      });

      it('should validate a globalChannel for custom-pnpres', (done) => {
          global('MYUUID#custom-pnpres')
              .then(done)
              .catch(err => {
                  assert.deepEqual(err, null);
                  done();
              });
      });

      it('should be not valid a fake globalChannel', (done) => {
          global('#chat#public.*')
              .then(() => {
                  assert.isOk(false);
                  done();
              })
              .catch(err => {
                  const expected = { status: 401, message: 'Bad global channel' };
                  assert.deepEqual(err, expected);
                  done();
              });
      });
    });

    describe('#route', () => {
        it('should be valid', (done) => {
            const controllers = { invite: { get: () => {} } };

            route(controllers, 'invite', 'get')
                .then(done)
                .catch(err => {
                    assert.deepEqual(err, null);
                    done();
                });
        });

        it('should be invalid a route', (done) => {
            const controllers = { invite: { get: () => {} } };

            route(controllers, 'fakeInvite', 'post')
                .then(() => {
                    assert.isOk(false);
                    done();
                })
                .catch(err => {
                    const expected = { status: 404, message: 'Invalid route' };
                    assert.deepEqual(err, expected);
                    done();
                });
        });

        it('should be invalid a method', (done) => {
            const controllers = { invite: { get: () => {} } };

            route(controllers, 'invite', 'post')
                .then(() => {
                    assert.isOk(false);
                    done();
                })
                .catch(err => {
                    const expected = { status: 404, message: 'Invalid method' };
                    assert.deepEqual(err, expected);
                    done();
                });
        });
    });

    describe('#uuid', () => {
        it('should be valid', (done) => {
            uuid('UUID123')
                .then(done)
                .catch(err => {
                    assert.deepEqual(err, null);
                    done();
                });
        });

        it('should be invalid', (done) => {
            uuid(123456)
                .then(() => {
                    assert.isOk(false);
                    done();
                })
                .catch(err => {
                    const expected = { status: 401, message: 'UUID must be a string' };
                    assert.deepEqual(err, expected);
                    done();
                });
        })
    });
});
