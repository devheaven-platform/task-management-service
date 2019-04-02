const mongoose = require( "mongoose" );

/**
 * The mongoose schema for Board.
 */
const columnSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true,
    },
    boardId: {
        type: mongoose.Types.ObjectId,
        ref: "Board",
        required: true,
    },
    tasks: [ { type: mongoose.Schema.Types.ObjectId, ref: "Task" } ],
} );

/* eslint-disable no-underscore-dangle, no-param-reassign */
columnSchema.set( "toJSON", {
    virtuals: true,
    versionKey: false,
    transform: ( doc, ret ) => { delete ret._id; },
} );
/* eslint-enable no-underscore-dangle, no-param-reassign */

/**
 * The model "Board" derived from the boardSchema.
 */
const model = mongoose.model( "Column", columnSchema );
module.exports = model;
