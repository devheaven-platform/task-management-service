const Board = require( "../models/Board" );

/**
 *
 * @param {String} name, the name of the board.
 */
async function createBoard( projectId, name ) {
    let boardName = "Default";
    if ( name ) {
        boardName = name;
    }
    if ( !projectId ) return null;

    const board = new Board();
    board.projectId = projectId;
    board.name = boardName;
    await board.save();

    return board;
}

/**
 * Gets all boards of a project.
 * @param {String} projectId, the id of the project.
 */
async function getAll( projectId ) {
    const boards = await Board.find( { projectId } ).exec();
    return boards;
}

/**
 * Deletes a board from the database.
 * @param {String} id, the id of the board.
 */
async function deleteBoard( id ) {
    try {
        if ( id !== undefined ) {
            await Board.deleteOne( { _id: id } ).exec();
            return true;
        }
        return false;
    } catch ( e ) {
        return false;
    }
}

/**
 * Update the board with the given values.
 * @param {String} id, the id of the board.
 * @param {*} data, the data for updating the board.
 * @param {String[]} columns, the columns to add to the board.
 */
async function updateBoard( id, data, columns ) {
    let parsedData = data;
    if ( columns !== undefined && columns.length > 0 ) {
        parsedData = {
            ...data,
            $push: { columns: { $each: columns } },
        };
    }
    const board = await Board.findOneAndUpdate( { _id: id }, parsedData, { new: true } ).exec();
    return board;
}

module.exports = {
    createBoard, getAll, deleteBoard, updateBoard,
};
