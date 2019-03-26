const BoardService = require( "../services/BoardService" );

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

async function getAll( req, res ) {
    if ( !req.body.projectId ) {
        return res.status( 400 ).json( { message: "Specify projectId" } );
    }
    const boards = await BoardService.getAll( req.body.projectId );

    res.status( 200 );
    return res.json( { message: "Retrieved all boards of the project.", boards } );
}

/**
 * Removes a board with the given id.
 * @param {HTTPRequest} req, the request
 * @param {HTTPResponse} res, the response
 */
async function deleteBoard( req, res ) {
    if ( !req.body.id ) {
        return res.status( 400 ).json( { message: "Specify id to delete!" } );
    }

    const result = await BoardService.deleteBoard( req.body.id );
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
    if ( !req.body.id ) {
        return res.status( 400 ).json( { message: "Specify id to update!" } );
    }

    if ( !req.body.name && !req.body.status ) {
        return res.status( 400 ).json( { message: "Specify the new changes to add!" } );
    }

    const board = await BoardService
        .updateBoard( req.body.id, { name: req.body.name, status: req.body.status } );
    if ( board ) {
        return res.status( 200 ).json( { message: "Board updated.", board } );
    }
    return res.status( 500 ).json( { message: "Something went wrong while trying to update the board!" } );
}

module.exports = {
    createBoard, getAll, updateBoard, deleteBoard,
};
