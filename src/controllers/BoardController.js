const BoardService = require( "../services/BoardService" );
const Validator = require( "../validator/Validator" );

/**
 * Creates a board.
 * @param {HTTPRequest} req, the request
 * @param {HTTPResponse} res, the response
 */
async function createBoard( req, res ) {
    const board = await BoardService.createBoard( req.body.projectId, req.body.name );
    if ( !req.body.projectId ) {
        return res.status( 400 ).json( { message: "Specify projectId" } );
    }

    res.status( 201 );
    return res.json( { message: "Created board!", board } );
}

async function getBoardById( req, res ) {
    if ( !req.params.id ) {
        return res.status( 400 ).json( { message: "Specify the board id" } );
    }
    const board = await BoardService.getBoardById( req.params.id );
    res.status( 200 );
    return res.json( { message: "Retrieved the board", board } );
}

async function getAll( req, res ) {
<<<<<<< HEAD
    if ( !req.params.id ) {
        return res.status( 400 ).json( { message: "Specify projectId" } );
    }
    const boards = await BoardService.getAll( req.params.id );
=======
    if ( !req.params.projectId ) {
        return res.status( 400 ).json( { message: "Specify projectId" } );
    }
    const boards = await BoardService.getAll( req.params.projectId );
>>>>>>> Change req.body to use req.params in get requests and delete requests

    res.status( 200 );
    return res.json( { message: "Retrieved all boards of the project.", boards } );
}

/**
 * Removes a board with the given id.
 * @param {HTTPRequest} req, the request
 * @param {HTTPResponse} res, the response
 */
async function deleteBoard( req, res ) {
    if ( !req.params.id ) {
        return res.status( 400 ).json( { message: "Specify id to delete!" } );
    }

    const result = await BoardService.deleteBoard( req.params.id );
    if ( result ) {
        return res.status( 204 ).json( { message: "Board was successfully deleted." } );
    }
    return res.status( 500 ).json( { message: "Something went wrong while trying to delete the board!" } );
}

/**
 * Updates the board with the given values.
 * @param {HTTPRequest} req, the request
 * @param {HTTPResponse} res, the response
 */
async function updateBoard( req, res ) {
    const result = await Validator.validateUpdateBoardRequest( req, res );

    const board = await BoardService
        .updateBoard( req.body.id, result );
    if ( board ) {
        return res.status( 200 ).json( { message: "Board updated.", board } );
    }
    return res.status( 500 ).json( { message: "Something went wrong while trying to update the board!" } );
}

module.exports = {
    createBoard, getAll, updateBoard, deleteBoard, getBoardById,
};
