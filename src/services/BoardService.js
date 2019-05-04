const Column = require( "../models/Column" );
const Board = require( "../models/Board" );
const Task = require( "../models/Task" );

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
    const board = new Board( newBoard ).save();

    // TODO: send event to project-management-service to add board to project

    return board;
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
const deleteBoard = async ( id ) => {
    const board = await Board.findByIdAndRemove( id ).exec();
    if ( !board ) {
        return null;
    }

    // TODO: send event to project-management-service to delete board from project

    // Delete tasks
    const columns = await Promise.all( board.columns.map( async columnId => Column.findById( columnId ).exec() ) );
    const tasks = columns.map( column => column.tasks );
    await Task.deleteMany( { _id: { $in: [].concat( ...tasks ) } } ).exec();

    // Delete columns
    await Column.deleteMany( { _id: { $in: board.columns } } ).exec();

    return board;
};

module.exports = {
    getBoards,
    getBoardById,
    createBoard,
    updateBoard,
    deleteBoard,
};
