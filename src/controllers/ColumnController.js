const ColumnService = require( "../services/ColumnService" );

/**
 * Creates a column.
 * @param {HTTPRequest} req, the request
 * @param {HTTPResponse} res, the response
 */
async function createColumn( req, res ) {
    const board = await ColumnService.createColumn( req.body.boardId, req.body.name );
    if ( !req.body.boardId ) {
        return res.status( 403 ).json( { message: "Specify projectId" } );
    }

    return res.json( { message: "Created Column!", board } );
}

/**
 * Deletes a column
 * @param {HTTPRequest} req, the request
 * @param {HTTPResponse} res, the response
 */
async function deleteColumn( req, res ) {
    const result = await ColumnService.deleteColumn( req.body.id );
    if ( result ) {
        res.status( 204 );
    } else {
        res.status( 403 );
        res.json( { message: "Something went wrong while trying to delete the board!" } );
    }
}

module.exports = {
    createColumn, deleteColumn,
};
