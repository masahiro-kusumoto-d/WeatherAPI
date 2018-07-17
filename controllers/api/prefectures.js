const { check, validationResult } = require('express-validator/check');

function getPrefectures({ db }) {
  return async (req, res) => {
    db.prefectures.findAll({
      order: [['id', 'ASC']],
      include: [db.weathers]
    }).then(function (prefectures) {
      res.status(200);
      res.json({ prefectures });
    });
  };
}

function getPrefecture({ db }) {
  return async (req, res) => {
    if (!req.params.id.match(/^[1-9]\d*$/)) {
      res.status(422);
      res.json({ error: 'Error occured: Invalid Prefecture ID' });
      return;
    }
    const prefecture = await db.prefectures.findOne({
      where: { id: req.params.id },
      include: [db.weathers]
    });

    if (!prefecture) {
      res.status(404);
      res.json({ error: 'Error occured: Prefecture Not Found' });
      return;
    }

    res.json(prefecture);
  };
}

function postPrefecture({ db }) {
  return [
    check('name')
      .isLength({ min: 1, max: 255 })
      .withMessage('Error occured: name is too long'),
    check('symbol_url')
      .isLength({ min: 1, max: 255 })
      .withMessage('Error occured: symbol_url is too long'),
    check('condition')
      .isLength({ min: 1, max: 45 })
      .withMessage('Error occured: condition is too long'),
    check('temp_min')
      .isInt()
      .withMessage('Error occured: temp_min is empry or not integer'),
    check('temp_max')
      .isInt()
      .withMessage('Error occured: temp_max is empry or not integer'),
    check('icon_url')
      .isLength({ min: 1, max: 255 })
      .withMessage('Error occured: temp_max is empry or not integer'),
    async (req, res) => {
      const err = validationResult(req);
      if (!err.isEmpty()) {
        res.status(422);
        res.json({ error: err.mapped() });
        return;
      }
      const prefecture = await db.prefectures.create({
        name: req.query.name,
        symbol_url: req.query.symbol_url,
      });
      await db.weathers.create({
        prefecture_id: prefecture.id,
        condition: req.query.condition,
        temp_min: req.query.temp_min,
        temp_max: req.query.temp_max,
        icon_url: req.query.icon_url
      });
      const result = await db.prefectures.findOne({
        where: { id: prefecture.id },
        include: [db.weathers]
      });
      res.json(result);
    }
  ];
}

function deletePrefecture({ db }) {
  return async (req, res) => {
    if (!req.params.id.match(/^[1-9]\d*$/)) {
      res.status(422);
      res.json({ error: 'Error occured: Invalid Prefecture ID' });
      return;
    }
    const prefecture = await db.prefectures.findOne({ where: { id: req.params.id } });

    if (!prefecture) {
      res.status(404);
      res.json({ error: 'Error occured: Prefecture Not Found' });
    } else {
      // physically delete row from db
      await prefecture.destroy();
      res.json({});
    }
  };
}

module.exports = { getPrefectures, getPrefecture, postPrefecture, deletePrefecture };
