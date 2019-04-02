const mongoose = require( "mongoose" );

/**
 * The mongoose schema for Board.
 */
const taskSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true,
    },
    columnId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Column",
        required: true,
    },
    description: {
        type: String,
    },
    assignees: [ {
        type: String,
    } ],
} );

/* eslint-disable no-underscore-dangle, no-param-reassign */
taskSchema.set( "toJSON", {
    virtuals: true,
    versionKey: false,
    transform: ( doc, ret ) => { delete ret._id; },
} );
/* eslint-enable no-underscore-dangle, no-param-reassign */

/**
 * The model "Board" derived from the boardSchema.
 */
const model = mongoose.model( "Task", taskSchema );
module.exports = model;
