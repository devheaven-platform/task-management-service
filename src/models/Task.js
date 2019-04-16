/* eslint-disable no-underscore-dangle, no-param-reassign */
const mongoose = require( "mongoose" );
const uuid = require( "uuid" );

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The id of the task
 *           example: 55417624-c159-4eab-9260-d4679a2e9b31
 *         name:
 *           type: string
 *           description: The name of the task
 *           example: Task 1
 *         description:
 *           type: string
 *           description: The description of the task
 *           example: This task ...
 *         assignees:
 *           type: array
 *           description: A list of user id's assigned to the task
 *           items:
 *              type: string
 *         hours:
 *           type: number
 *           description: The amount of hours a task should take
 *           example: 2
 *         createdAt:
 *            type: string
 *            description: The date a task was created on
 *            example: 2019-01-01T00:00:00.000Z
 *         updatedAt:
 *            type: string
 *            description: The date a task was last updated on
 *            example: 2019-01-01T00:00:00.000Z
 *       required:
 *         - id
 *         - name
 *         - createdAt
 *         - updatedAt
 */
const Task = new mongoose.Schema( {
    _id: {
        type: String,
        default: uuid.v4,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    assignees: [ {
        type: String,
    } ],
    hours: {
        type: Number,
        default: 0,
    },
}, { timestamps: true } );

Task.set( "toJSON", {
    virtuals: true,
    versionKey: false,
    transform: ( doc, ret ) => { delete ret._id; },
} );

module.exports = mongoose.model( "Task", Task );
/* eslint-enable no-underscore-dangle, no-param-reassign */
