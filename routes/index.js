const express = require('express');
const router = express.Router();
const models = require('../models');
const { getIndex } = require('./../controllers/api/index');

/* GET home page. */
router.get('/', getIndex({ db: models }));

module.exports = router;
