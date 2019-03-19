const BoardService = require( "../services/BoardService" );

/**
 * Creates a board.
 * @param {HTTPRequest} req, the request
 * @param {HTTPResponse} res, the response
 */
async function createBoard( req, res ) {
    const board = await BoardService.createBoard( req.body.name );

    res.json( { message: "Created board!", board } );
}
module.exports = {
    createBoard,
};
