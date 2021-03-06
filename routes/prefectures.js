const express = require('express');
const router = express.Router();
const prefectureApi = require('./../controllers/api/prefectures');
const models = require('../models');

/* GET prefectures listing. */
router.get('/', prefectureApi.getPrefectures({ db: models }));
router.get('/:id(\\d+)', prefectureApi.getPrefecture({ db: models }));
router.post('/', prefectureApi.postPrefecture({ db: models }));
router.delete('/:id(\\d+)', prefectureApi.deletePrefecture({ db: models }));

module.exports = router;
