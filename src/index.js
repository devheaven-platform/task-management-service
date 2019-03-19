require( "dotenv" ).config();
const express = require( "express" );
const bodyparser = require( "body-parser" );
const cors = require( "cors" );
const mongoose = require( "mongoose" );
const Prometheus = require( "prom-client" );
const expressPrometheus = require( "express-prom-bundle" );
const logger = require( "./config/logger" );

const app = express();
app.disable( "x-powered-by" );

// Server config
const port = process.env.PORT;
const host = process.env.HOSTNAME;
const mongoDB = process.env.MONGO_DB;
const mongoURI = process.env.MONGO_URI;

// Middleware
app.use( bodyparser.json() );
app.use( cors() );

//Routes
const boardRoutes = require("./routes/BoardRoutes");
app.use("/board", boardRoutes);

// Connect database
mongoose
    .connect( mongoURI + mongoDB, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false } )
    .then( () => logger.info( "MongoDB connected" ) )
    .catch( error => logger.error( error.stack ) );

// Register prometheus
Prometheus.collectDefaultMetrics();
app.use( expressPrometheus() );

// Add prometheus
app.get( "/metrics", ( req, res ) => {
    res.set( "Content-Type", Prometheus.register.contentType );
    res.end( Prometheus.register.metrics() );
} );
// Not found
app.all( "*", ( req, res ) => res.status( 404 ).json( {
    name: "NotFound",
    message: "Resource Not Found",
    status: 404,
} ) );

// Global error handler
app.use( ( error, req, res ) => {
    logger.error( "An unhandled exception occurred", error );
    return res.status( 500 ).json( {
        name: "InternalServerError",
        message: "An error ocurred",
        status: 500,
    } );
} );

// Start service
app.listen( port, () => {
    logger.info( `Service: listening on http://${ host }:${ port }` );
} );
module.exports = app;