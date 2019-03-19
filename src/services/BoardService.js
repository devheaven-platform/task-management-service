const Board = require("../models/Board");

/**
 *
 * @param {String} name, the name of the board.
 */
async function createBoard(projectId, name) {
    let boardName = "Default";
    if (name) {
        boardName = name;
    }
    if (!projectId)
        return null;

    const board = new Board();
    board.projectId = projectId;
    board.name = boardName;
    await board.save();

    return board;
}

/**
 * Deletes a board from the database.
 * @param {ObjectId} projectId, the id of the board 
 */
async function getAll(projectId) {
    const boards = await Board.find({ projectId: projectId }).exec();
    return boards;
}


async function deleteBoard( id ) {
    try {
        await Board.deleteOne( { _id: id } ).exec();
        return true;
    } catch ( e ) {
        return false;
    }
}

module.exports = {
    createBoard, getAll, deleteBoard
};
