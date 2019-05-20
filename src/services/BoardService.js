/* eslint-disable no-new, no-restricted-syntax, no-await-in-loop */
const axios = require( "axios" );
const { pickBy } = require( "lodash" );
const ColumnService = require( "../services/ColumnService" );
const { MessageConsumer, MessageProducer } = require( "../config/messaging/Kafka" );
const Column = require( "../models/Column" );
const Board = require( "../models/Board" );
const Task = require( "../models/Task" );

const producer = new MessageProducer();

/**
 * Gets all boards from the database
 *
 * @returns a list of boards
 */
const getBoards = async () => Board.find().exec();

/**
 * Gets one board from the database
 *
 * @returns the board or null
 */
const getBoardById = async id => Board.findById( id ).populate( {
    path: "columns",
    populate: {
        path: "tasks",
    },
} ).exec();

/**
 * Creates a new board and calls the project
 * management service to add the board to the
 * project
 *
 * @param {Object} newBoard the board to add
 * @returns the new board or null if an error occurred
 */
const createBoard = async ( newBoard ) => {
    const board = await new Board( newBoard ).save();

    // Add to project
    await producer.send( "db.task-management.create-board", {
        board: board.id,
        project: newBoard.project,
    } );

    const newDoneColumn = {
        name: "Done",
        columnType: "DONE",
        board: board.id,
    };

    const newBackLogColumn = {
        name: "Backlog",
        columnType: "TODO",
        board: board.id,
    };

    const doneColumn = await ColumnService.createColumn( newDoneColumn );
    const backlogColumn = await ColumnService.createColumn( newBackLogColumn );

    board.columns.push( backlogColumn, doneColumn );

    return board;
};

/**
 * Returns all the boards for a project with their finished tasks.
 *
 * @param {String} projectId the id of the project
 * @param {Date} start the min date the tasks can have
 * @param {Date} end the max date the tasks can have
 */
const getFinishedBoardTasks = async ( projectId, start, end ) => {
    const uri = process.env.PROJECT_MANAGEMENT_URI;
    const { data } = await axios.get( `${ uri }/projects/${ projectId }` );

    const query = {
        $gte: start ? new Date( start * 1000 ) : undefined,
        $lte: end ? new Date( end * 1000 ) : undefined,
    };

    const promises = data.boards.map( async boardId => Board.findById( boardId ).populate( {
        path: "columns",
        match: { type: "DONE" },
        populate: {
            path: "tasks",
            match: { updatedAt: pickBy( query, v => v !== undefined ) },
        },
    } ).exec() );

    const results = await Promise.all( promises );
    return results;
};

/**
 * Updates a existing board
 *
 * @param {String} id the id of the board to update
 * @param {Object} board the updated board values
 * @returns the updated board or null if an error occurred
 */
const updateBoard = async ( id, board ) => Board.findOneAndUpdate( { _id: id }, board, { new: true } ).populate( {
    path: "columns",
    populate: {
        path: "tasks",
    },
} ).exec();

/**
 * Deletes a board from the database and calls the
 * project management service to remove the board
 * from the project.
 *
 * @param {String} id the id of the board to delete
 * @returns the deleted board or null if an error occurred
 */
const deleteBoard = async ( id, emit = true ) => {
    const board = await Board.findByIdAndRemove( id ).exec();
    if ( !board ) {
        return null;
    }

    // Delete from project
    if ( emit ) {
        await producer.send( "db.task-management.delete-board", {
            board: board.id,
        } );
    }

    // Delete tasks
    const columns = await Promise.all( board.columns.map( async columnId => Column.findById( columnId ).exec() ) );
    const tasks = columns.map( column => column.tasks );
    await Task.deleteMany( { _id: { $in: [].concat( ...tasks ) } } ).exec();

    // Delete columns
    await Column.deleteMany( { _id: { $in: board.columns } } ).exec();

    return board;
};

/**
 * Delete boards when a project is deleted.
 *
 * @param {Object} message the message from the project-mangement
 * service.
 */
new MessageConsumer( "db.project-management.delete-project", async ( message ) => {
    const { boards } = message;

    for ( const board of boards ) {
        await deleteBoard( board, false );
    }
} );

module.exports = {
    getBoards,
    getBoardById,
    getFinishedBoardTasks,
    createBoard,
    updateBoard,
    deleteBoard,
};
/* eslint-enable no-new, no-restricted-syntax, no-await-in-loop */
