
const APIError = require("./api_error")

module.exports = (requestProperty="auth") => {
    function jwtErrorHandler(req, res, next) {
        if (!req[requestProperty]) {
            const err = new APIError("", 401);
            return next(err);
        }
        return next();
    }

    return jwtErrorHandler;
}
