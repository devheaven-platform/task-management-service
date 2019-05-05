/* eslint complexity: 0 */
const { logLevel } = require( "kafkajs" );

/**
 * Convert log kafka log level to winston log level.
 *
 * @param {Number} level the level to convert.
 * @returns winston log level.
 */
const toLogLevel = ( level ) => {
    switch ( level ) {
        case logLevel.ERROR:
        case logLevel.NOTHING:
            return "error";
        case logLevel.WARN:
            return "warn";
        case logLevel.INFO:
            return "info";
        case logLevel.DEBUG:
            return "debug";
        default:
            return "verbose";
    }
};

module.exports = {
    toLogLevel,
};
