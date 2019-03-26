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

/**
 * Return a list of all the columns that are in a board.
 * @param {String} boardId, the id of the board.
 */
async function getcolumnsForBoardId( boardId ) {
    try {
        const columns = await Column.find( { boardId } ).exec();
        return columns;
    } catch ( e ) {
        return null;
    }
}

module.exports = {
    createColumn, deleteColumn, getcolumnsForBoardId,
};
