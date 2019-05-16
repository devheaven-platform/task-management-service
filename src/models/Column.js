/* eslint-disable no-underscore-dangle, no-param-reassign */
const mongoose = require( "mongoose" );
const uuid = require( "uuid" );

/**
 * @swagger
 * components:
 *   schemas:
 *     Column:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The id of the column
 *           example: 55417624-c159-4eab-9260-d4679a2e9b31
 *         name:
 *           type: string
 *           description: The name of the column
 *           example: To Do
 *         tasks:
 *           type: array
 *           description: A list containing all the tasks id's
 *           items:
 *             type: string
 *         createdAt:
 *           type: string
 *           description: The date a column was created on
 *           example: 2019-01-01T00:00:00.000Z
 *         updatedAt:
 *           type: string
 *           description: The date a column was last updated on
 *           example: 2019-01-01T00:00:00.000Z
 *       required:
 *         - id
 *         - name
 *         - createdAt
 *         - updatedAt
 */
const Column = new mongoose.Schema( {
    _id: {
        type: String,
        default: uuid.v4,
    },
    name: {
        type: String,
        required: true,
    },
    isDoneColumn: {
        type: Boolean,
        required: true,
    },
    tasks: [ {
        type: String,
        ref: "Task",
    } ],
}, { timestamps: true } );

Column.set( "toJSON", {
    virtuals: true,
    versionKey: false,
    transform: ( doc, ret ) => { delete ret._id; },
} );

module.exports = mongoose.model( "Column", Column );
/* eslint-enable no-underscore-dangle, no-param-reassign */
