const winston = require( "winston" );

const logger = winston.createLogger( {
    level: "info",
    transports: [
        new winston.transports.Console( {
            format: process.env.NODE_ENV !== "production" ? winston.format.combine(
                winston.format.colorize(),
                winston.format.simple(),
            ) : winston.format.json(),
            handleExceptions: true,
        } ),
    ],
    exitOnError: false,
} );

module.exports = logger;
