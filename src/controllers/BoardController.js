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

async function deleteBoard( req, res ) {
    const result = await BoardService.deleteBoard( req.body.id );
    if ( result ) {
        res.status( 204 );
    } else {
        res.status( 500 );
        res.json( { message: "Something went wrong while trying to delete the board!" } );
    }
}

module.exports = {
    createBoard,
    deleteBoard,
};
