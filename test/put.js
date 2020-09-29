process.env.NODE_ENV = 'test';


const expect = require('chai').expect;
const request = require('supertest');
const {app} = require('../app');


it('test PUT', (done) => {
    request(app).post('/task')
      .send({ content: 'test' })
      .then((res) => {
        url = '/edit/' + res.body._id;
        request(app).put(url).send({content: 'update'})
          .then((res) => {
            const body = res.body;
            expect(body).to.contain.property('nModified');
            request(app).delete('/deleteAll');
            done();
          })
      })
      .catch((err) => done(err));
});

