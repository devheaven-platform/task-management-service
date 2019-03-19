const BoardService = require( "../services/BoardService" );

/**
 * Creates a board.
 * @param {HTTPRequest} req, the request
 * @param {HTTPResponse} res, the response
 */
async function createBoard( req, res ) {
    const board = await BoardService.createBoard( req.body.projectId, req.body.name );
    if ( !req.body.projectId ) {
        return res.status( 401 ).json( { message: "Specify projectId" } );
    }

    return res.json( { message: "Created board!", board } );
}

async function getAll( req, res ) {
    if ( !req.body.projectId ) {
        return res.status( 401 ).json( { message: "Specify projectId" } );
    }
    const boards = await BoardService.getAll( req.body.projectId );

    return res.json( { message: "Retrieved all boards of the project.", boards } );
}

/**
 *
 * @param {HTTPRequest} req, the request
 * @param {HTTPResponse} res, the response
 */
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
    createBoard, deleteBoard, getAll,
};
