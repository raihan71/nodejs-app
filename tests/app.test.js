const app = require('../app');
const request = require('supertest');

describe('testing app.js', () => {
  test('should return hello world', () => {
    request(app).get('/').expect(200).expect('Hello World!');
  });
});
