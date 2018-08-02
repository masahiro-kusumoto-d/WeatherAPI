const { check, validationResult } = require('express-validator/check');

function getTyphoons({ db }) {
    return async (req, res) => {
        const typhoons = await db.typhoons.findAll({
            order: [['id', 'ASC']]
        });
        res.status(200);
        res.json(typhoons);
    };
}

function getTyphoon({ db }) {
    return async (req, res) => {
        const typhoon = await db.typhoons.findOne({ where: { id: req.params.id } });

        if (!typhoon) {
            res.status(404);
            res.json({ error: 'Typhoon Not Found' });
            return;
        }

        res.status(200);
        res.json(typhoon);
    };
}

function postTyphoon({ db }) {
    return [
        check('center_longitude')
            .isFloat()
            .withMessage('prefecture name is too long'),
        check('center_latitude')
            .isFloat()
            .withMessage('prefecture symbol_url is too long'),
        check('central_pressure')
            .isInt()
            .withMessage('prefecture symbol_url is too long'),
        check('intensity')
            .isString()
            .withMessage('intensity is string')
            .isLength({ min: 1, max: 255 })
            .withMessage('prefecture symbol_url is too long'),
        async (req, res) => {
            const err = validationResult(req);
            if (!err.isEmpty()) {
                res.status(422);
                res.json({ error: err.mapped() });
                return;
            }
            // IDがauto incrementなのに、いるのが謎...
            const typhoon = await db.typhoons.create({
                center_latitude: req.body.center_latitude,
                center_longitude: req.body.center_longitude,
                central_pressure: req.body.central_pressure,
                intensity: req.body.intensity,
            });
            res.status(201);
            res.json(typhoon);
        }
    ];
}

function deleteTyphoon({ db }) {
    return async (req, res) => {
        const typhoon = await db.typhoons.findOne({ where: { id: req.params.id } });
        if (!typhoon) {
            res.status(404);
            res.json({ error: 'Typhoon Not Found' });
        } else {
            // physically delete row from db
            await typhoon.destroy();
            res.status(204);
            res.json({});
        }
    };
}

module.exports = { getTyphoons, getTyphoon, postTyphoon, deleteTyphoon };
