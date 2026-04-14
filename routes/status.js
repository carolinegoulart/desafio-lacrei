const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res
        .set('Content-Type', 'application/json')
        .status(200)
        .json({ status: 'ok' });
});

module.exports = router;