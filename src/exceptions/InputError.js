const ClientError = require("../exceptions/ClientError");
 
class InputError extends ClientError {
    constructor(message, statusCode = 400) {
        super(message);
        this.name = 'InputError';
        this.statusCode = Number.isInteger(statusCode) ? statusCode : 400; // Validasi status code
    }
}
 
module.exports = InputError;