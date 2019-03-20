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
 * Removes a board with the given id.
 * @param {HTTPRequest} req, the request
 * @param {HTTPResponse} res, the response
 */
async function deleteBoard( req, res ) {
    if ( !req.body.id ) {
        return res.status( 401 ).json( { message: "Specify id to delete!" } );
    }

    if ( result ) {
        await BoardService.deleteBoard( req.body.id );
        res.status( 204 );
    } else {
        res.status( 500 ).json( { message: "Something went wrong while trying to delete the board!" } );
    }
}

/**
 * Updates the board with the given values.
 * @param {HTTPRequest} req, the request
 * @param {HTTPResponse} res, the response
 */
async function updateBoard( req, res ) {
    if ( !req.body.id ) {
        return res.status( 401 ).json( { message: "Specify the id to update!" } );
    }

    if ( !req.body.name && !req.body.columns && !req.body.status) {
        return res.status( 401 ).json( { message: "Specify at least one value to update" } );
    }

    const validatedData = BoardValidator.validateUpdateBody( req.body );
    if ( validatedData.errors === undefined ) {
        const result = await BoardService.updateBoard( validatedData.data.id, validatedData.data.body, validatedData.data.columns );
        res.status( 200 ).json( { message: "Board updated.", result } );
    } else {
        res.status( 500 ).json( { message: "The board could not be updated!", errors: validatedData.errors } );
    }
}

module.exports = {
    createBoard, deleteBoard, getAll, updateBoard,
};
