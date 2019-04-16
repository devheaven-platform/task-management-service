const Column = require( "../models/Column" );
const Board = require( "../models/Board" );
const Task = require( "../models/Task" );

/**
 * Gets all columns from the database
 *
 * @returns a list of columns
 */
const getColumns = async () => Column.find();

/**
 * Gets one column from the database
 *
 * @returns the column or null
 */
const getColumnById = async id => Column.findById( id ).populate( {
    path: "tasks",
} ).exec();

/**
 * Creates a new column
 *
 * @param {Object} newColumn the column to add
 * @returns the new column or null if an error occurred
 */
const createColumn = async ( newColumn ) => {
    // Create column
    const column = await new Column( newColumn ).save();

    // Append to board
    const board = await Board.findById( newColumn.board ).exec();
    board.columns.push( column.id );
    await board.save();

    return column;
};

/**
 * Updates a existing column
 *
 * @param {String} id the id of the column to update
 * @param {Object} column the updated column values
 * @returns the column board or null if an error occurred
 */
const updateColumn = async ( id, column ) => Column.findOneAndUpdate( { _id: id }, column, { new: true } ).exec();

/**
 * Deletes a column from the database
 *
 * @param {String} id the id of the column to delete
 * @returns the deleted column or null if an error occurred
 */
const deleteColumn = async ( id ) => {
    const column = await Column.findByIdAndDelete( id ).exec();
    if ( !column ) {
        return null;
    }

    // Delete from board
    const board = await Board.findOne( { columns: column.id } ).exec();
    if ( board ) {
        board.columns = board.columns.filter( columnId => columnId !== column.id );
        await board.save();
    }

    // Delete tasks
    await Task.deleteMany( { _id: { $in: column.tasks } } ).exec();

    return column;
};

module.exports = {
    getColumns,
    getColumnById,
    createColumn,
    updateColumn,
    deleteColumn,
};
