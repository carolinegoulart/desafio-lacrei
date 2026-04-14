const { describe, it } = require('node:test');
const assert = require('node:assert');
const express = require('express');
const request = require('supertest');
const statusRouter = require('./status');

describe('routes/status', () => {
  it('GET request to "/status "should return HTTP status 200', async () => {
    // Arrange
    const app = express();
    app.use('/status', statusRouter);

    // Execute
    const res = await request(app).get('/status').expect(200);

    // Assert
    assert.strictEqual(res.headers['content-type'], 'application/json; charset=utf-8');
    assert.deepStrictEqual(res.body, { status: 'ok' });
  });
});
