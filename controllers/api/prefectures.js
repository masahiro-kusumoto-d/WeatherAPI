
function getPrefectures({ db }) {
  return async (req, res) => {
    db.prefectures.findAll({
      order: [['id', 'ASC']]
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
      where: {
        id: req.params.id,
      },
    });

    if (!prefecture) {
      res.status(404);
      res.json({ error: 'Error occured: Prefecture Not Found' });
      return;
    }

    res.json(prefecture);
  };
}

module.exports = { getPrefectures, getPrefecture };
