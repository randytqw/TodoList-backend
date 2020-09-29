process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');
const {app} = require('../app');
const axios = require('axios');

it('test DEL', (done) => {
    request(app).post('/task')
    .send({ content: 'test' })
    .then((res) => {
      url = '/delete/' + res.body._id;
      request(app).delete(url)
        .then((res) => {
          const body = res.body;
          console.log(body);
          expect(body).to.contain.property('deletedCount');
          done();
        })
    })
    .catch((err) => done(err));
});

axios.delete('http://localhost:3000/deleteAll');