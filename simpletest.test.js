const request = require('supertest');
const { app, startServer, stopServer, connectDB, disconnectDB } = require('./server');

beforeAll(() => {
  startServer();
  connectDB();
});

afterAll(() => {
  stopServer();
  disconnectDB();
});

test('It should respond to GET method', async () => {
  const response = await request(app).get('/');
  expect(response.statusCode).toBe(200);
});

