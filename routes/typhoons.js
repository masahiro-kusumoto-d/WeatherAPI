const express = require('express');
const router = express.Router();
const typhoonApi = require('./../controllers/api/typhoons');
const models = require('../models');

/* GET typhoons listing. */
router.get('/', typhoonApi.getTyphoons({ db: models }));
router.get('/:id(\\d+)', typhoonApi.getTyphoon({ db: models }));
router.post('/', typhoonApi.postTyphoon({ db: models }));
router.delete('/:id(\\d+)', typhoonApi.deleteTyphoon({ db: models }));

module.exports = router;
