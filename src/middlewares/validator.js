const validate = (validator) => {
    return (req, res, next) => {
        try {
            validator.validatePayload(req.body);
        } catch (err) {
            next(err);
        }
    };
};

module.exports = validate;