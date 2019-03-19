const Board = require( "../models/Board" );

/**
 *
 * @param {String} name, the name of the board.
 */
async function createBoard( name ) {
    let boardName = name;
    if ( !boardName ) {
        boardName = "Default";
    }

    const board = new Board();
    board.name = boardName;
    await board.save();

    return board;
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
    createBoard,
    deleteBoard,
};
