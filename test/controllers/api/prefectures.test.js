process.env.NODE_ENV = 'test';
const sinon = require('sinon');
const assert = require('assert');
const { validationResult } = require('express-validator/check');
const prefectureApi = require('./../.././../controllers/api/prefectures');

describe('prefectures', () => {
    describe('getPrefectures', () => {
        it('都道府県が存在するときはその都道府県の配列情報をjsonで返す', async () => {
            const stubWeather = {
                id: 1,
                prefecture_id: 1,
                condition: '晴れ',
                date: '2018-07-13T10:30:50Z',
                icon_url: "https://350x150",
                temp_max: 832.3,
                temp_min: -297
            };
            const stubPrefectures = [
                {
                    id: 1,
                    name: 'Tokyo',
                    symbol_url: 'http://tokyoto.gif',
                    weather: stubWeather
                }
            ];
            const db = {
                prefectures: {
                    findAll: sinon.spy(sinon.stub().resolves(stubPrefectures))
                }
            };
            const res = {
                status: sinon.spy(),
                json: sinon.spy(),
            };
            assert(db.prefectures.findAll.notCalled);

            await prefectureApi.getPrefectures({ db: db })({}, res, {});

            assert(res.status.calledOnce);
            assert.deepEqual(res.status.firstCall.args, [200]);

            assert(db.prefectures.findAll.calledOnce);
            assert.deepEqual(db.prefectures.findAll.firstCall.args, [
                {
                    order: [['id', 'ASC']],
                    include: [db.weathers]
                }
            ]);
            assert(res.json.calledOnce);
            assert.deepEqual(res.json.firstCall.args, [
                [{
                    id: 1,
                    name: 'Tokyo',
                    symbol_url: 'http://tokyoto.gif',
                    weather: {
                        id: 1,
                        prefecture_id: 1,
                        condition: '晴れ',
                        date: '2018-07-13T10:30:50Z',
                        icon_url: "https://350x150",
                        temp_max: 832.3,
                        temp_min: -297
                    }
                }]
            ]);
        });

        it('都道府県が存在しないときは空配列をjsonで返す', async () => {
            const stubPrefectures = [];
            const db = {
                prefectures: {
                    findAll: sinon.spy(sinon.stub().resolves(stubPrefectures))
                }
            };
            const res = {
                status: sinon.spy(),
                json: sinon.spy(),
            };
            assert(db.prefectures.findAll.notCalled);
            await prefectureApi.getPrefectures({ db: db })({}, res, {});
            assert(db.prefectures.findAll.calledOnce);
            assert(res.status.calledOnce);
            assert.deepEqual(res.status.firstCall.args, [200]);
            assert.deepEqual(db.prefectures.findAll.firstCall.args, [
                {
                    order: [['id', 'ASC']],
                    include: [db.weathers]
                }
            ]);
            assert(res.json.calledOnce);
            assert.deepEqual(res.json.firstCall.args, [
                []
            ]);
        });
    });

    describe('postPrefecture', () => {
        it('送られて来た都道府県情報をDBに保存し、jsonで返す', async () => {
            const stubWeather = {
                id: 1,
                prefecture_id: 1,
                condition: '晴れ',
                date: '2018-07-13T10:30:50Z',
                icon_url: "https://350x150",
                temp_max: 832,
                temp_min: 297
            };
            const stubPrefecture = {
                id: 1,
                name: 'Tokyo',
                symbol_url: 'http://tokyoto.gif',
                weather: stubWeather
            };
            const db = {
                prefectures: {
                    findOne: sinon.spy(sinon.stub().resolves(stubPrefecture)),
                    create: sinon.spy(sinon.stub().resolves(stubPrefecture))
                },
                weathers: {
                    create: sinon.spy(sinon.stub().resolves(stubWeather))
                }
            };
            const req = {
                body: {
                    name: 'Tokyo',
                    symbol_url: 'http://tokyoto.gif',
                    condition: '晴れ',
                    temp_min: 297,
                    temp_max: 832,
                    icon_url: "https://350x150"
                }
            };
            const res = {
                status: sinon.spy(),
                json: sinon.spy(),
            };
            assert(db.prefectures.findOne.notCalled);

            const callBacks = prefectureApi.postPrefecture({ db: db });
            assert.deepEqual(callBacks.length, 7);
            await callBacks[0](req, res, () => { });
            await callBacks[1](req, res, () => { });
            await callBacks[2](req, res, () => { });
            await callBacks[3](req, res, () => { });
            await callBacks[4](req, res, () => { });
            await callBacks[5](req, res, () => { });
            await callBacks[6](req, res, () => { });

            assert(res.status.calledOnce);
            assert.deepEqual(res.status.firstCall.args, [201]);
            assert(res.json.calledOnce);
            assert.deepEqual(res.json.firstCall.args, [
                {
                    id: 1,
                    name: 'Tokyo',
                    symbol_url: 'http://tokyoto.gif',
                    weather: {
                        id: 1,
                        prefecture_id: 1,
                        condition: '晴れ',
                        date: '2018-07-13T10:30:50Z',
                        icon_url: "https://350x150",
                        temp_max: 832,
                        temp_min: 297
                    }
                }
            ]);
        });

        it('送られて来た都道府県情報が誤った場合はエラーを返す', async () => {
            const stubWeather = {
                id: 1,
                prefecture_id: 1,
                condition: '晴れ',
                date: '2018-07-13T10:30:50Z',
                icon_url: "https://350x150",
                temp_max: 832,
                temp_min: 297
            };
            const stubPrefecture = {
                id: 1,
                name: 'Tokyo',
                symbol_url: 'http://tokyoto.gif',
                weather: stubWeather
            };
            const db = {
                prefectures: {
                    findOne: sinon.spy(sinon.stub().resolves(stubPrefecture)),
                    create: sinon.spy(sinon.stub().resolves(stubPrefecture))
                },
                weathers: {
                    create: sinon.spy(sinon.stub().resolves(stubWeather))
                }
            };
            const req = {
                body: {
                    name: 1,
                    symbol_url: 1,
                    condition: 1,
                    temp_min: "たけのこ",
                    temp_max: "きのこ",
                    icon_url: 1
                }
            };
            const res = {
                status: sinon.spy(),
                json: sinon.spy(),
            };
            assert(db.prefectures.findOne.notCalled);

            const callBacks = prefectureApi.postPrefecture({ db: db });
            assert.deepEqual(callBacks.length, 7);
            await callBacks[0](req, res, () => { });
            await callBacks[1](req, res, () => { });
            await callBacks[2](req, res, () => { });
            await callBacks[3](req, res, () => { });
            await callBacks[4](req, res, () => { });
            await callBacks[5](req, res, () => { });
            await callBacks[6](req, res, () => { });

            assert(res.status.calledOnce);
            assert.deepEqual(res.status.firstCall.args, [422]);
            assert(res.json.calledOnce);
            const err = validationResult(req);
            assert.deepEqual(res.json.args, [[{ error: err.mapped() }]]);
        });
    });

    describe('deletePrefecture', () => {
        it('指定したIDで保存された都道府県情報を削除', async () => {
            const stubWeather = {
                id: 1,
                prefecture_id: 1,
                condition: '晴れ',
                date: '2018-07-13T10:30:50Z',
                icon_url: "https://350x150",
                temp_max: 832,
                temp_min: 297
            };
            const stubPrefecture = {
                id: 1,
                name: 'Tokyo',
                symbol_url: 'http://tokyoto.gif',
                weather: stubWeather,
                destroy: sinon.spy()
            };
            const db = {
                prefectures: {
                    findOne: sinon.spy(sinon.stub().resolves(stubPrefecture))
                }
            };
            const req = { params: { id: 1 } };
            const res = {
                status: sinon.spy(),
                json: sinon.spy(),
            };
            assert(db.prefectures.findOne.notCalled);

            await prefectureApi.deletePrefecture({ db: db })(req, res, {});
            assert(res.status.calledOnce);
            assert.deepEqual(res.status.firstCall.args, [204]);
            assert(db.prefectures.findOne.calledOnce);
            assert.deepEqual(db.prefectures.findOne.firstCall.args, [{ where: { id: 1 } }]);
            assert(stubPrefecture.destroy.calledOnce);
            assert.deepEqual(stubPrefecture.destroy.firstCall.args, []);
        });

        it('指定したIDで都道府県情報が保存されていない場合404を返す', async () => {
            const db = {
                prefectures: {
                    findOne: sinon.spy(sinon.stub().resolves(null))
                }
            };
            const req = { params: { id: 1 } };
            const res = {
                status: sinon.spy(),
                json: sinon.spy(),
            };
            assert(db.prefectures.findOne.notCalled);

            await prefectureApi.deletePrefecture({ db: db })(req, res, {});
            assert(db.prefectures.findOne.calledOnce);
            assert.deepEqual(db.prefectures.findOne.firstCall.args, [{ where: { id: 1 } }]);
            assert.deepEqual(res.json.firstCall.args, [
                {
                    error: 'Prefecture Not Found',
                },
            ]);

            assert(res.status.calledOnce);
            assert.deepEqual(res.status.firstCall.args, [404]);
        });
    });

    describe('getPrefecture', () => {
        it('指定したIDの都道府県が存在するとき都道府県のJSONが返る', async () => {
            const stubWeather = {
                id: 1,
                prefecture_id: 1,
                condition: '晴れ',
                date: '2018-07-13T10:30:50Z',
                icon_url: "https://350x150",
                temp_max: 832.3,
                temp_min: -297
            };
            const stubPrefecture = {
                id: 1,
                name: 'Tokyo',
                symbol_url: 'http://tokyoto.gif',
                weather: stubWeather
            };
            const db = {
                prefectures: {
                    findOne: sinon.spy(
                        sinon.stub().resolves(stubPrefecture)
                    ),
                },
            };

            const res = {
                status: sinon.spy(),
                json: sinon.spy(),
            };
            const req = { params: { id: 1 } };

            await prefectureApi.getPrefecture({ db })(req, res, undefined);

            assert(db.prefectures.findOne.calledOnce);
            assert.deepEqual(db.prefectures.findOne.firstCall.args, [
                {
                    where: { id: 1 },
                    include: [undefined]
                }
            ]);


            assert.deepEqual(res.json.firstCall.args, [
                {
                    id: 1,
                    name: 'Tokyo',
                    symbol_url: 'http://tokyoto.gif',
                    weather: {
                        id: 1,
                        prefecture_id: 1,
                        condition: '晴れ',
                        date: '2018-07-13T10:30:50Z',
                        icon_url: "https://350x150",
                        temp_max: 832.3,
                        temp_min: -297
                    }
                }
            ]);

            assert(res.status.calledOnce);
            assert.deepEqual(res.status.firstCall.args, [200]);
        });

        it('都道府県が存在しないIDのとき404が返る', async () => {
            const db = {
                prefectures: {
                    findOne: sinon.spy(
                        sinon.stub().resolves(null)
                    ),
                },
            };

            const res = {
                status: sinon.spy(),
                json: sinon.spy(),
            };
            const req = {
                params: {
                    id: 1
                },
            };

            await prefectureApi.getPrefecture({ db })(req, res, undefined);

            assert(db.prefectures.findOne.calledOnce);
            assert.deepEqual(db.prefectures.findOne.firstCall.args, [
                {
                    where: { id: 1 },
                    include: [undefined]
                }
            ]);


            assert.deepEqual(res.json.firstCall.args, [
                {
                    error: 'Prefecture Not Found',
                },
            ]);

            assert(res.status.calledOnce);
            assert.deepEqual(res.status.firstCall.args, [404]);
        });
    });
});