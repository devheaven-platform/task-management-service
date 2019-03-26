const mongoose = require("mongoose");

/**
 * The mongoose schema for Board.
 */
const boardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    projectId: {
        type: String,
        required: true,
    },
    columns: [ {
        type: String,
        required: true
    },
    columns: [{
        type: String,
    }],
    status: {
        type: String,
        enum: ["Open", "Closed"],
        default: "Open",
    },
});

/* eslint-disable no-underscore-dangle, no-param-reassign */
boardSchema.set( "toJSON", {
    virtuals: true,
    versionKey: false,
    transform: ( doc, ret ) => { delete ret._id; },
} );
/* eslint-enable no-underscore-dangle, no-param-reassign */

/**
 * The model "Board" derived from the boardSchema.
 */
const model = mongoose.model("Board", boardSchema);
module.exports = model;
