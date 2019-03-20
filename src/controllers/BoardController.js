const BoardService = require( "../services/BoardService" );
const BoardValidator = require( "../validators/BoardValidator" );

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

async function updateBoard( req, res ) {
    const validatedData = BoardValidator.validateUpdateBody( req.body );
    if ( validatedData.errors === undefined ) {
        const result = await BoardService.updateBoard( validatedData.data.id, validatedData.data.body, validatedData.data.columns );
        res.status( 200 );
        res.json( { message: "Board updated.", result } );
    } else {
        res.status( 500 );
        res.json( { message: "The board could not be updated!", errors: validatedData.errors } );
    }
}

module.exports = {
    createBoard, deleteBoard, getAll, updateBoard,
};
