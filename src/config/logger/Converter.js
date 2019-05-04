/* eslint complexity: 0 */
const { logLevel } = require( "kafkajs" );

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
