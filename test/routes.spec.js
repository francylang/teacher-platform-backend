/* eslint-disable */

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

const should = chai.should();

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('Client Routes', () => {
  it('should return an html homepage with text', (done) => {
  chai.request(server)
    .get('/')
    .end((error, response) => {
      response.should.have.status(200);
      response.should.be.html;
      response.res.text.includes('Teacher Forum');
      done();
    });
});

  it('should return a 404 for a route that does not exist', (done) => {
    chai.request(server)
      .get('/sadPath')
      .end((err, response) => {
        response.should.have.status(404);
        done();
      });
  });

});

// describe('API Routes', () => {
//   before((done) => {
//     database.migrate.latest()
//       .then(() => done())
//       .catch((error) => {
//         throw error;
//       });
//   });
//
//   beforeEach((done) => {
//     database.seed.run()
//       .then(() => done())
//       .catch((error) => {
//         throw error;
//       });
//   });

// });
