const express = require('express');
const { downloadCv } = require('../controllers/cvController');

const router = express.Router();
router.get('/pdf', downloadCv('pdf'));
router.get('/docx', downloadCv('docx'));

module.exports = router;
