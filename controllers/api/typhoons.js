const { check, validationResult } = require('express-validator/check');

function getTyphoons({ db }) {
    return async (req, res) => {
        db.typhoons.findAll({
            order: [['id', 'ASC']],
        }).then(function (typhoons) {
            res.status(200);
            res.json({ typhoons });
        });
    };
}

function getTyphoon({ db }) {
    return async (req, res) => {
        if (!req.params.id.match(/^[1-9]\d*$/)) {
            res.status(422);
            res.json({ error: 'Error occured: Invalid Typhoon ID' });
            return;
        }
        // なんかおかしい
        const typhoon = await db.typhoons.findOne({ where: { id: req.params.id } });

        if (!typhoon) {
            res.status(404);
            res.json({ error: 'Error occured: Typhoon Not Found' });
            return;
        }

        res.json(typhoon);
    };
}

function postTyphoon({ db }) {
    return [
        check('center_longitude')
            .isFloat()
            .withMessage('Error occured: prefecture name is too long'),
        check('center_latitude')
            .isFloat()
            .withMessage('Error occured: prefecture symbol_url is too long'),
        check('central_pressure')
            .isInt()
            .withMessage('Error occured: prefecture symbol_url is too long'),
        check('intensity')
            .isLength({ min: 1, max: 255 })
            .withMessage('Error occured: prefecture symbol_url is too long'),
        async (req, res) => {
            const err = validationResult(req);
            if (!err.isEmpty()) {
                res.status(422);
                res.json({ error: err.mapped() });
                return;
            }
            // IDがauto incrementなのに、いるのが謎...
            const typhoon = await db.typhoons.create({
                center_latitude: req.query.center_latitude,
                center_longitude: req.query.center_longitude,
                central_pressure: req.query.central_pressure,
                intensity: req.query.intensity,
            });
            res.json(typhoon);
        }
    ];
}

function deleteTyphoon({ db }) {
    return async (req, res) => {
        if (!req.params.id.match(/^[1-9]\d*$/)) {
            res.status(422);
            res.json({ error: 'Error occured: Invalid Typhoon ID' });
            return;
        }

        const typhoon = await db.typhoons.findOne({ where: { id: req.params.id } });
        if (!typhoon) {
            res.status(404);
            res.json({ error: 'Error occured: Prefecture Not Found' });
        } else {
            // physically delete row from db
            await typhoon.destroy();
            res.json({});
        }
    };
}

module.exports = { getTyphoons, getTyphoon, postTyphoon, deleteTyphoon };
