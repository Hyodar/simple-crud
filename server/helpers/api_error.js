
const httpStatus = require("http-status");
const ExtendableError = require("./extendable_error");

class APIError extends ExtendableError {
    constructor(message, status = httpStatus.INTERNAL_SERVER_ERROR, isPublic=true) {
        super(message, status, isPublic);
    }
}

module.exports = APIError;
