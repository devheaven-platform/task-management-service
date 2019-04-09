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

    try {
        const board = new Board();
        board.projectId = projectId;
        board.name = boardName;
        await board.save();

        return board;
    } catch ( e ) {
        return null;
    }
}

/**
 * Gets a board with the arrays populated.
 * @param {*} id, the id of the board
 */
async function getBoardById( id ) {
    const board = await Board.findById( id ).populate( {
        path: "columns",
        populate: { path: "tasks" },
    } ).exec();
    return board;
}

/**
 * Gets all boards of a project.
 * @param {String} projectId, the id of the project.
 */
async function getAll( projectId ) {
    try {
        const boards = await Board.find( { projectId } ).exec();
        return boards;
    } catch ( e ) {
        return null;
    }
}

/**
 * Deletes a board from the database.
 * @param {String} id, the id of the board.
 */
async function deleteBoard( id ) {
    try {
        if ( id ) {
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
 * @param { } data, the new values of the board.
 */
async function updateBoard( id, data ) {
    try {
        if ( !data ) {
            return null;
        }

        const board = await Board.findOneAndUpdate( { _id: id }, data, { new: true } ).exec();
        return board;
    } catch ( e ) {
        return null;
    }
}

module.exports = {
    createBoard, getAll, deleteBoard, updateBoard, getBoardById,
};
