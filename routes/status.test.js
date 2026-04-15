const path = require('path');
const { describe, it } = require('node:test');
const assert = require('node:assert');
const express = require('express');
const request = require('supertest');
const statusRouter = require('./status');
const pkg = require(path.join(__dirname, '..', 'package.json'));

describe('routes/status', () => {
  it('GET request to "/status" should return HTTP status 200', async () => {
    // Arrange
    const app = express();
    app.use('/status', statusRouter);

    // Execute
    const res = await request(app).get('/status').expect(200);

    // Assert
    assert.match(res.headers['content-type'], /^application\/json/);
    assert.strictEqual(res.body.status, 'ok');
    assert.strictEqual(res.body.version, pkg.version);
    assert.strictEqual(res.body.environment, process.env.NODE_ENV);
  });
});
