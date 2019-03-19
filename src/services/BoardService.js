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
async function getAll(projectId) {
    const boards = await Board.find({ projectId: projectId }).exec();
    return boards;
}
module.exports = {
    createBoard, getAll
};
