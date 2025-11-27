import "../../chunk-G2ADBYYC.js";
import Schema from './schema.js';
import validators from './validations/index.js';
import getDefaultMessage from './messages.js';
Schema.validators = validators;
Schema.getDefaultMessage = getDefaultMessage;
var validate_default = Schema;
export { validate_default as default };