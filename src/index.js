const express = require( "express" );

const app = express();
const port = process.env.PORT || 3000;
const cors = require( "cors" );
const bodyParser = require( "body-parser" );
const mongoose = require( "mongoose" );

const dbUrl = process.env.MONGOLAB_URI || "mongodb://localhost:27017/taskservice";

mongoose.connect( dbUrl, { useNewUrlParser: true } );

app.use( cors() );

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: false } ) );

const boardRoutes = require( "./routes/BoardRoutes" );

app.use( "/board", boardRoutes );
app.listen( port );

console.log( `Task Management Service started on: ${ port }` );

module.exports = app;
