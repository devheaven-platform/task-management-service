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
    if ( !req.body.id ) {
        return res.status( 400 ).json( { message: "Specify id to delete!" } );
    }
    const result = await ColumnService.deleteColumn( req.body.id );
    if ( result ) {
        return res.status( 204 ).json( { message: "Column was successfully deleted." } );
    }
    return res.status( 500 ).json( { message: "Something went wrong while trying to delete the column!" } );
}

/**
 * Retrieves all the columns for the given board id.
 * @param {HTTPRequest} req, the request
 * @param {HTTPResponse} res, the response
 */
async function getColumnsForBoard( req, res ) {
    if ( !req.params.boardId ) {
        return res.status( 400 ).json( { message: "Specify a board id1" } );
    }

    const result = await ColumnService.getcolumnsForBoardId( req.params.boardId );
    if ( result ) {
        return res.status( 200 ).json( { message: "Columns were successfully retrieved.", result } );
    }
    return res.status( 500 ).json( { message: "Something went wrong while trying to get the columns for the board!" } );
}

module.exports = {
    createColumn, deleteColumn, getColumnsForBoard,
};
