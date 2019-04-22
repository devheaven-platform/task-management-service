const expressPrometheus = require( "express-prom-bundle" );
const swaggerUi = require( "swagger-ui-express" );
const bodyparser = require( "body-parser" );
const Prometheus = require( "prom-client" );
const mongoose = require( "mongoose" );
const express = require( "express" );
const cors = require( "cors" );
require( "dotenv" ).config();

const logger = require( "./config/logger" );
const specs = require( "./config/swagger" );

const app = express();
app.disable( "x-powered-by" );

// Server config
const port = process.env.NODE_PORT;
const host = process.env.NODE_HOST;
const mongoDB = process.env.MONGO_DB;
const mongoURI = process.env.MONGO_URI;

// Middleware
app.use( bodyparser.json() );
app.use( cors( { origin: "*" } ) );

// Connect database
mongoose
    .connect( mongoURI + mongoDB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    } )
    .then( () => logger.info( "MongoDB connected" ) )
    .catch( error => logger.error( error.stack ) );

// Register prometheus
Prometheus.collectDefaultMetrics();
app.use( expressPrometheus() );

// Metrics
app.get( "/metrics", ( req, res ) => {
    res.set( "Content-Type", Prometheus.register.contentType );
    res.end( Prometheus.register.metrics() );
} );

// Health
app.get( "/health", ( req, res ) => res.json( {
    message: "Service is running",
} ) );

// Docs
app.use( "/docs", swaggerUi.serve, swaggerUi.setup( specs ) );

// Routes
app.use( "/boards", require( "./routes/BoardRoutes" ) );
app.use( "/columns", require( "./routes/ColumnRoutes" ) );
app.use( "/tasks", require( "./routes/TaskRoutes" ) );

// Not found
app.all( "*", ( req, res ) => res.status( 404 ).json( {
    message: "Resource Not Found",
} ) );

// Global error handler
// eslint-disable-next-line
app.use( ( error, req, res, next ) => {
    logger.error( error.stack );
    return res.status( 500 ).json( {
        message: "An unexpected error occurred",
    } );
} );

// Start service
app.listen( port, () => {
    logger.info( `Service: listening on http://${ host }:${ port }` );
} );
