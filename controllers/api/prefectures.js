const { check, validationResult } = require('express-validator/check');

async function getPrefecturesFromDB(db) {
  return new Promise(resolve => {
    const prefectures = db.prefectures.findAll({
      order: [['id', 'ASC']],
      include: [db.weathers]
    });
    resolve(prefectures);
  });
}

function getIndex({ db }) {
  return async (req, res) => {
    const prefectures = await getPrefecturesFromDB(db);
    res.render('prefectures', {
      title: 'Express',
      prefectures: prefectures
    });
  };
}

function getPrefectures({ db }) {
  return async (req, res) => {
    const prefectures = await getPrefecturesFromDB(db);
    res.status(200);
    res.json(prefectures);
  };
}

function getPrefecture({ db }) {
  return async (req, res) => {
    const prefecture = await db.prefectures.findById(req.params.id, {
      include: [db.weathers]
    });

    if (!prefecture) {
      res.status(404);
      res.json({ error: 'Prefecture Not Found' });
      return;
    }
    res.status(200);
    res.json(prefecture);
  };
}

function postPrefecture({ db }) {
  return [
    check('name')
      .isString()
      .withMessage('name is string')
      .isLength({ min: 1, max: 255 })
      .withMessage('name is too long'),
    check('symbol_url')
      .isString()
      .withMessage('symbol_url is string')
      .isLength({ min: 1, max: 255 })
      .withMessage('symbol_url is too long'),
    check('condition')
      .isString()
      .withMessage('condition is string')
      .isLength({ min: 1, max: 45 })
      .withMessage('condition is too long'),
    check('temp_min')
      .isInt()
      .withMessage('temp_min is empry or not integer'),
    check('temp_max')
      .isInt()
      .withMessage('temp_max is empry or not integer'),
    check('icon_url')
      .isString()
      .withMessage('icon_url is string')
      .isLength({ min: 1, max: 255 })
      .withMessage('temp_max is empry or not integer'),
    async (req, res) => {
      const err = validationResult(req);
      if (!err.isEmpty()) {
        res.status(400);
        res.json({ error: err.mapped() });
        return;
      }
      const prefecture = await db.prefectures.create({
        name: req.body.name,
        symbol_url: req.body.symbol_url,
      });
      await db.weathers.create({
        prefecture_id: prefecture.id,
        condition: req.body.condition,
        temp_min: req.body.temp_min,
        temp_max: req.body.temp_max,
        icon_url: req.body.icon_url
      });
      // const result = await db.prefectures.findById(prefecture.id, {
      //   include: [db.weathers]
      // });
      res.status(201);
      res.redirect('/prefectures');
    }
  ];
}

function deletePrefecture({ db }) {
  return async (req, res) => {
    const prefecture = await db.prefectures.findById(req.params.id);

    if (!prefecture) {
      res.status(404);
      res.json({ error: 'Prefecture Not Found' });
    } else {
      await prefecture.destroy();
      res.status(204);
      res.json({});
    }
  };
}

module.exports = { getIndex, getPrefectures, getPrefecture, postPrefecture, deletePrefecture };
