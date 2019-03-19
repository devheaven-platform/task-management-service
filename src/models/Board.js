const mongoose = require( "mongoose" );

/**
 * The mongoose schema for Board.
 */
const boardSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true,
    },
    columns: [ {
        type: String,
    } ],
    status: {
        type: String,
        enum: [ "Open", "Closed" ],
        default: "Open",
    },
} );

/**
 * The model "Board" derived from the boardSchema.
 */
const model = mongoose.model( "Board", boardSchema );
module.exports = model;
