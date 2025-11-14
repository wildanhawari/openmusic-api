const BaseError = require('../errors/BaseError');

const errorHandler = (err, req, res, next) => {
    if (err instanceof BaseError) {
        return res.status(err.statusCode).json({
            status: 'fail',
            message: err.message,
        });
    }

    console.error(err);
    return res.status(500).json({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
    });
};

module.exports = errorHandler;