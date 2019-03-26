const ColumnService = require( "../services/ColumnService" );

/**
 * Creates a column.
 * @param {HTTPRequest} req, the request
 * @param {HTTPResponse} res, the response
 */
async function createColumn( req, res ) {
    if ( !req.body.boardId ) {
        return res.status( 400 ).json( { message: "Specify boardId" } );
    }

    if ( !req.body.name ) {
        return res.status( 400 ).json( { message: "Specify name" } );
    }

    const column = await ColumnService.createColumn( req.body.boardId, req.body.name );

    if ( column ) {
        res.status( 201 );
        return res.json( { message: "Created the column!", column } );
    }
    return res.status( 500 ).json( { message: "Something went wrong trying to create the column." } );
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
        res.status( 500 );
        res.json( { message: "Something went wrong while trying to delete the column!" } );
    }
}

module.exports = {
    createColumn, deleteColumn,
};
