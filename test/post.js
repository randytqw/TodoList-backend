process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');
const {app} = require('../app');



it('test POST', (done) => {
    request(app).post('/task')
      .send({ content: 'test' })
      .then((res) => {
        const body = res.body;
        expect(body).to.contain.property('_id');
        expect(body).to.contain.property('content');
        done();
      })
      .catch((err) => done(err));
});


