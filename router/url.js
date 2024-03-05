const express = require("express");
const { handleGenerateNewShortURL , handleGetAnalytics , handleDoEntry } = require('../controllers/url');

const router = express.Router();

router.post('/',handleGenerateNewShortURL);

router.get('/analytics/:shortId',handleGetAnalytics);

router.get('/:shortId',handleDoEntry);

module.exports = router;