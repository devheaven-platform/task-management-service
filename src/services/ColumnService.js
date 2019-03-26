const Column = require( "../models/Column" );

/**
 * Creates a column for the given board.
 * @param {String} name, the name of the column
 */
async function createColumn( boardId, name ) {
    if ( !name ) return null;
    if ( !boardId ) return null;

    try {
        const column = new Column();
        column.boardId = boardId;
        column.name = name;
        await column.save();

        return column;
    } catch ( e ) {
        return null;
    }
}

/**
 * Deletes a board from the database.
 * @param {String} id, the id of the board.
 */
async function deleteColumn( id ) {
    try {
        if ( id ) {
            await Column.deleteOne( { _id: id } ).exec();
            return true;
        }
        return false;
    } catch ( e ) {
        return false;
    }
}

module.exports = {
    createColumn, deleteColumn,
};
