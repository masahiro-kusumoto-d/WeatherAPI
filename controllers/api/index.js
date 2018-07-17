function getIndex() {
    return async (req, res) => {
        res.render('index', { title: 'Express' });
    };
}

module.exports = { getIndex };
