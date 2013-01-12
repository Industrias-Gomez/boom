// Load modules

var Chai = require('chai');
var Boom = process.env.TEST_COV ? require('../lib-cov') : require('../lib');


// Declare internals

var internals = {};


// Test shortcuts

var expect = Chai.expect;


describe('Boom', function () {

    it('returns an error with info when constructed using another error and message', function (done) {

        var err = new Boom(new Error('inner'), 'outter');
        expect(err.message).to.equal('inner');
        expect(err.info).to.equal('outter');
        done();
    });

    describe('#badRequest', function () {

        it('returns a 400 error code', function (done) {

            expect(Boom.badRequest().code).to.equal(400);
            done();
        });

        it('sets the message with the passed in message', function (done) {

            expect(Boom.badRequest('my message').message).to.equal('my message');
            done();
        });
    });

    describe('#unauthorized', function () {

        it('returns a 401 error code', function (done) {

            var err = Boom.unauthorized();
            expect(err.code).to.equal(401);
            expect(err.toResponse().headers).to.not.exist;
            done();
        });

        it('sets the message with the passed in message', function (done) {

            expect(Boom.unauthorized('my message').message).to.equal('my message');
            done();
        });

        it('returns a WWW-Authenticate header when passed a scheme', function (done) {

            var err = Boom.unauthorized('boom', 'Test');
            expect(err.code).to.equal(401);
            expect(err.toResponse().headers['WWW-Authenticate']).to.equal('Test error="boom"');
            done();
        });

        it('returns a WWW-Authenticate header when passed a scheme and attributes', function (done) {

            var err = Boom.unauthorized('boom', 'Test', { a: 1, b: 'something', c: null, d: 0 });
            expect(err.code).to.equal(401);
            expect(err.toResponse().headers['WWW-Authenticate']).to.equal('Test a="1", b="something", c="", d="0", error="boom"');
            done();
        });
    });

    describe('#forbidden', function () {

        it('returns a 403 error code', function (done) {

            expect(Boom.forbidden().code).to.equal(403);
            done();
        });

        it('sets the message with the passed in message', function (done) {

            expect(Boom.forbidden('my message').message).to.equal('my message');
            done();
        });
    });

    describe('#notFound', function () {

        it('returns a 404 error code', function (done) {

            expect(Boom.notFound().code).to.equal(404);
            done();
        });

        it('sets the message with the passed in message', function (done) {

            expect(Boom.notFound('my message').message).to.equal('my message');
            done();
        });
    });

    describe('#internal', function () {

        it('returns a 500 error code', function (done) {

            expect(Boom.internal().code).to.equal(500);
            done();
        });

        it('sets the message with the passed in message', function (done) {

            expect(Boom.internal('my message').message).to.equal('my message');
            done();
        });

        it('passes data on the callback if its passed in', function (done) {

            expect(Boom.internal('my message', { my: 'data' }).data.my).to.equal('data');
            done();
        });
    });

    describe('#toResponse', function () {

        it('formats a custom error', function (done) {

            var err = new Boom(500, 'Unknown');
            err.toResponse = function () {

                return { payload: { test: true } };
            };

            expect(err.toResponse().payload.test).to.equal(true);
            done();
        });
    });
});


