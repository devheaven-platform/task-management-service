const validator = require( "validator" );

/**
 * Checks whether a string is a valid UUID v4
 *
 * @param {String} value the value to check
 * @returns true if the value is a valid UUID
 */
const id = value => value && validator.isUUID( value );

/**
 * Checks if a value is of type string
 *
 * @param {*} value the value to check
 * @returns true if the value is a string
 */
const isString = value => typeof value === typeof "";

/**
 * Checks if a value is of type number
 *
 * @param {*} value the value to check
 * @returns true if the value is a number
 */
const isNumber = value => typeof value === typeof 1;

/**
 * Checks if a value is of type array
 *
 * @param {*} value the value to check
 * @returns true if the value is a array
 */
const isArray = value => typeof value === typeof [];

/**
 * Checks if a value is of type boolean
 *
 * @param {*} value the value to check
 * @returns true if the value is a boolean
 */
const isBoolean = value => typeof value === typeof true;

module.exports = {
    id,
    isString,
    isNumber,
    isArray,
    isBoolean,
};
