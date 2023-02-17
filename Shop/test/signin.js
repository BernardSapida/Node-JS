const expect = require('chai').expect;
const postSignup = require('./../controllers/AuthController').postSignup;
const sinon = require('sinon');

describe('AuthController' , function () {
    it('valid signup credential', () => {
        const req = {
            body: {
                
            }
        }

        // Authentication Testing
        // sinon.stub(jwt, 'verify');
        // jwt.verify.returns({ userId: 'abc' });
        
        postSignup(req, {}, () => {});
        expect(req.to.have.property('email'));
        expect(req.to.have.property('password'));
        // expect(jwt.verify.called).to.be.true;
        // expect(postSignup.bind(req).to.throw())

        // jwt.verify.restore();
    });
})