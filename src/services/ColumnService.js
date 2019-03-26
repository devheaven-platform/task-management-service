const Column = require( "../models/Column" );

/**
 * Creates a column for the given board.
 * @param {String} name, the name of the column
 */
async function createColumn( boardId, name ) {
    let columnName = "Default";
    if ( name ) {
        columnName = name;
    }
    if ( !boardId ) return null;

    const column = new Column();
    column.boardId = boardId;
    column.name = columnName;
    await column.save();

    return column;
}

/**
 * Deletes a board from the database.
 * @param {String} id, the id of the board.
 */
async function deleteColumn( id ) {
    try {
        await Column.deleteOne( { _id: id } ).exec();
        return true;
    } catch ( e ) {
        return false;
    }
}

module.exports = {
    createColumn, deleteColumn,
};
