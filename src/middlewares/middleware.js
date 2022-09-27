exports.globalMiddleware = (req, res, next) => {
    res.locals.localVariable = 'Just a test, this could be a object, an array, a function, etc...';
    next();
};

exports.checkCsrfError = (err, req, res, next) => {
    if (err && 'EBADCSRFTOKEN' === err.code ) {
        return res.render('pag404')
    }
};

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
};
