/* eslint-disable no-underscore-dangle, no-param-reassign */
const mongoose = require( "mongoose" );
const uuid = require( "uuid" );

/**
 * @swagger
 * components:
 *   schemas:
 *     Board:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The id of the board
 *           example: 55417624-c159-4eab-9260-d4679a2e9b31
 *         name:
 *           type: string
 *           description: The name of the board
 *           example: Sprint 1
 *         status:
 *           type: string
 *           enum: [Open, Closed]
 *           description: The status of the board
 *           example: Open
 *         archived:
 *           type: boolean
 *           description: Whether the board is archived
 *           example: false
 *         columns:
 *           type: array
 *           description: A list containing the board columns id's
 *           items:
 *             type: string
 *         createdAt:
 *            type: string
 *            description: The date a board was created on
 *            example: 2019-01-01T00:00:00.000Z
 *         updatedAt:
 *            type: string
 *            description: The date a board was last updated on
 *            example: 2019-01-01T00:00:00.000Z
 *       required:
 *         - name
 *         - status
 *         - archived
 *         - createdAt
 *         - updatedAt
 */
const Board = new mongoose.Schema( {
    _id: {
        type: String,
        default: uuid.v4,
    },
    name: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: [ "Open", "Closed" ],
        default: "Open",
    },
    archived: {
        type: Boolean,
        default: false,
    },
    columns: [ {
        type: String,
        ref: "Column",
    } ],
}, { timestamps: true } );

Board.set( "toJSON", {
    virtuals: true,
    versionKey: false,
    transform: ( doc, ret ) => { delete ret._id; },
} );

module.exports = mongoose.model( "Board", Board );
/* eslint-enable no-underscore-dangle, no-param-reassign */
