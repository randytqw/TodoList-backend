process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');
const {app} = require('../app');

it('test GET', (done) => {
    
    request(app).delete('/deleteAll').then(res=>{request(app).post('/task')
    .send({ content: 'test' })
    .then((res) => {
      request(app).get('/tasks')
        .then((res) => {
          const body = res.body;
          expect(body.length).to.equal(1);
          done();
        })
    })})
    .catch((err) => done(err));
});
