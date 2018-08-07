process.env.NODE_ENV = 'test';
const sinon = require('sinon');
const assert = require('assert');
const { validationResult } = require('express-validator/check');
const typhoonApi = require('./../.././../controllers/api/typhoons');

describe('typhoons', () => {
    describe('getTyphoons', () => {
        it('台風が存在するときはその台風の配列情報をjsonで返す', async () => {
            const stubTyphoons = [
                {
                    id: 1,
                    center_longitude: 23.7,
                    center_latitude: 19.2,
                    central_pressure: 900,
                    intensity: '非常に雑魚',
                    date: '2018-07-13 10:30:50'
                }
            ];
            const db = {
                typhoons: {
                    findAll: sinon.spy(sinon.stub().resolves(stubTyphoons))
                }
            };
            const res = {
                status: sinon.spy(),
                json: sinon.spy(),
            };
            assert(db.typhoons.findAll.notCalled);

            await typhoonApi.getTyphoons({ db: db })({}, res, {});

            assert(res.status.calledOnce);
            assert.deepEqual(res.status.firstCall.args, [200]);

            assert(db.typhoons.findAll.calledOnce);
            assert.deepEqual(db.typhoons.findAll.firstCall.args, [{ order: [['id', 'ASC']] }]);
            assert(res.json.calledOnce);
            assert.deepEqual(res.json.firstCall.args, [
                [
                    {
                        id: 1,
                        center_longitude: 23.7,
                        center_latitude: 19.2,
                        central_pressure: 900,
                        intensity: '非常に雑魚',
                        date: '2018-07-13 10:30:50'
                    }
                ]
            ]);
        });

        it('台風が存在しないときは空配列をjsonで返す', async () => {
            const stubTyphoons = [];
            const db = {
                typhoons: {
                    findAll: sinon.spy(sinon.stub().resolves(stubTyphoons))
                }
            };
            const res = {
                status: sinon.spy(),
                json: sinon.spy(),
            };
            assert(db.typhoons.findAll.notCalled);

            await typhoonApi.getTyphoons({ db: db })({}, res, {});

            assert(res.status.calledOnce);
            assert.deepEqual(res.status.firstCall.args, [200]);

            assert(db.typhoons.findAll.calledOnce);
            assert.deepEqual(db.typhoons.findAll.firstCall.args, [
                {
                    order: [['id', 'ASC']]
                }
            ]);
            assert(res.json.calledOnce);
            assert.deepEqual(res.json.firstCall.args, [[]]);
        });
    });

    describe('getTyphoon', () => {
        it('指定したIDの台風が存在するとき台風のJSONが返る', async () => {
            const stubTyphoon = {
                id: 1,
                center_longitude: 23.7,
                center_latitude: 19.2,
                central_pressure: 900,
                intensity: '非常に雑魚',
                date: '2018-07-13 10:30:50'
            };
            const db = {
                typhoons: {
                    findOne: sinon.spy(
                        sinon.stub().resolves(stubTyphoon)
                    )
                }
            };

            const res = {
                status: sinon.spy(),
                json: sinon.spy(),
            };
            const req = { params: { id: 1 } };

            await typhoonApi.getTyphoon({ db })(req, res, undefined);

            assert(db.typhoons.findOne.calledOnce);
            assert.deepEqual(db.typhoons.findOne.firstCall.args, [{ where: { id: 1 } }]);

            assert.deepEqual(res.json.firstCall.args, [
                {
                    id: 1,
                    center_longitude: 23.7,
                    center_latitude: 19.2,
                    central_pressure: 900,
                    intensity: '非常に雑魚',
                    date: '2018-07-13 10:30:50'
                }
            ]);

            assert(res.status.calledOnce);
            assert.deepEqual(res.status.firstCall.args, [200]);
        });

        it('指定したIDの台風が存在しないとき404が返る', async () => {
            const db = {
                typhoons: {
                    findOne: sinon.spy(
                        sinon.stub().resolves(null)
                    ),
                },
            };

            const res = {
                status: sinon.spy(),
                json: sinon.spy(),
            };
            const req = { params: { id: 1 } };

            await typhoonApi.getTyphoon({ db })(req, res, undefined);

            assert(db.typhoons.findOne.calledOnce);
            assert.deepEqual(db.typhoons.findOne.firstCall.args, [{ where: { id: 1 } }]);


            assert.deepEqual(res.json.firstCall.args, [{ error: 'Typhoon Not Found' },]);

            assert(res.status.calledOnce);
            assert.deepEqual(res.status.firstCall.args, [404]);
        });
    });

    describe('postTyphoon', () => {
        it('送られて来た台風情報をDBに保存し、jsonで返す', async () => {
            const stubTyphoon = {
                id: 1,
                center_longitude: 23.7,
                center_latitude: 19.2,
                central_pressure: 900,
                intensity: '非常に雑魚',
                date: '2018-07-13 10:30:50'
            };
            const db = {
                typhoons: {
                    findOne: sinon.spy(sinon.stub().resolves(stubTyphoon)),
                    create: sinon.spy(sinon.stub().resolves(stubTyphoon))
                }
            };
            const req = {
                body: {
                    center_longitude: 23.7,
                    center_latitude: 19.2,
                    central_pressure: 900,
                    intensity: '非常に雑魚',
                    date: '2018-07-13 10:30:50'
                }
            };
            const res = {
                status: sinon.spy(),
                json: sinon.spy(),
            };
            assert(db.typhoons.findOne.notCalled);

            const callBacks = typhoonApi.postTyphoon({ db: db });
            assert.deepEqual(callBacks.length, 5);
            await callBacks[0](req, res, () => { });
            await callBacks[1](req, res, () => { });
            await callBacks[2](req, res, () => { });
            await callBacks[3](req, res, () => { });
            await callBacks[4](req, res, () => { });

            assert(res.status.calledOnce);
            assert.deepEqual(res.status.firstCall.args, [201]);
            assert(res.json.calledOnce);
            assert.deepEqual(res.json.firstCall.args, [
                {
                    id: 1,
                    center_longitude: 23.7,
                    center_latitude: 19.2,
                    central_pressure: 900,
                    intensity: '非常に雑魚',
                    date: '2018-07-13 10:30:50'
                }
            ]);
        });

        it('送られて来た都道府県情報が誤った場合はエラーを返す', async () => {
            const stubTyphoon = {
                id: 1,
                center_longitude: 23.7,
                center_latitude: 19.2,
                central_pressure: 900,
                intensity: '非常に雑魚',
                date: '2018-07-13 10:30:50'
            };
            const db = {
                typhoons: {
                    findOne: sinon.spy(sinon.stub().resolves(stubTyphoon)),
                    create: sinon.spy(sinon.stub().resolves(stubTyphoon))
                }
            };
            const req = {
                body: {
                    center_longitude: "きょろきょろ",
                    center_latitude: "あいうえお",
                    central_pressure: "1234567890",
                    intensity: 12345
                }
            };
            const res = {
                status: sinon.spy(),
                json: sinon.spy(),
            };
            assert(db.typhoons.findOne.notCalled);

            const callBacks = typhoonApi.postTyphoon({ db: db });
            assert.deepEqual(callBacks.length, 5);
            await callBacks[0](req, res, () => { });
            await callBacks[1](req, res, () => { });
            await callBacks[2](req, res, () => { });
            await callBacks[3](req, res, () => { });
            await callBacks[4](req, res, () => { });

            assert(res.status.calledOnce);
            assert.deepEqual(res.status.firstCall.args, [422]);
            assert(res.json.calledOnce);
            const err = validationResult(req);
            assert.deepEqual(res.json.args, [[{ error: err.mapped() }]]);
        });
    });

    describe('deleteTyphoon', () => {
        it('指定したIDで保存された台風情報を削除', async () => {
            const stubTyphoon = {
                id: 1,
                center_longitude: 23.7,
                center_latitude: 19.2,
                central_pressure: 900,
                intensity: '非常に雑魚',
                date: '2018-07-13 10:30:50',
                destroy: sinon.spy()
            };
            const db = {
                typhoons: {
                    findOne: sinon.spy(sinon.stub().resolves(stubTyphoon)),
                }
            };
            const req = { params: { id: 1 } };
            const res = {
                status: sinon.spy(),
                json: sinon.spy(),
            };
            assert(db.typhoons.findOne.notCalled);

            await typhoonApi.deleteTyphoon({ db: db })(req, res, {});
            assert(res.status.calledOnce);
            assert.deepEqual(res.status.firstCall.args, [204]);
            assert(db.typhoons.findOne.calledOnce);
            assert.deepEqual(db.typhoons.findOne.firstCall.args, [{ where: { id: 1 } }]);
            assert(stubTyphoon.destroy.calledOnce);
            assert.deepEqual(stubTyphoon.destroy.firstCall.args, []);
        });

        it('指定したIDで台風情報が保存されていない場合404を返す', async () => {
            const db = {
                typhoons: {
                    findOne: sinon.spy(sinon.stub().resolves(null))
                }
            };
            const req = { params: { id: 1 } };
            const res = {
                status: sinon.spy(),
                json: sinon.spy(),
            };
            assert(db.typhoons.findOne.notCalled);

            await typhoonApi.deleteTyphoon({ db: db })(req, res, {});
            assert(db.typhoons.findOne.calledOnce);
            assert.deepEqual(db.typhoons.findOne.firstCall.args, [{ where: { id: 1 } }]);
            assert.deepEqual(res.json.firstCall.args, [
                {
                    error: 'Typhoon Not Found',
                },
            ]);

            assert(res.status.calledOnce);
            assert.deepEqual(res.status.firstCall.args, [404]);
        });
    });
});