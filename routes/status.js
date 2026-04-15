const path = require('path');
const express = require('express');
const router = express.Router();

// Busca a versão da aplicação no arquivo package.json
const appVersion = require(path.join(__dirname, '..', 'package.json')).version;

router.get('/', (req, res) => {
    res
        .set('Content-Type', 'application/json')
        .status(200)
        .json({
            status: 'ok',
            version: appVersion,
            environment: process.env.NODE_ENV,
        });
});

module.exports = router;