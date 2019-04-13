const ColumnService = require( "../services/ColumnService" );
const validate = require( "../validators/ColumnValidator" );
const ApiError = require( "../models/Error" );

/**
 * Gets all the columns from the database
 *
 * @param {HttpRequest} req the request object
 * @param {HttpResponse} res the response object
 */
const getColumns = async ( req, res ) => {
    const columns = await ColumnService.getColumns();
    return res.json( columns );
};

/**
 * Gets one column by its id
 *
 * @param {HttpRequest} req the request object
 * @param {HttpResponse} res the response object
 */
const getColumnById = async ( req, res ) => {
    if ( !validate.id( req.params.id ) ) {
        return res.status( 400 ).json( new ApiError( "Id is invalid" ) );
    }

    const column = await ColumnService.getColumnById( req.params.id );

    if ( !column ) {
        return res.status( 404 ).json( new ApiError( "Column not found" ) );
    }

    return res.json( column );
};

/**
 * Creates a new column
 *
 * @param {HttpRequest} req the request object
 * @param {HttpResponse} res the response object
 */
const createColumn = async ( req, res ) => {
    const errors = validate.create( req.body );

    if ( Object.keys( errors ).length > 0 ) {
        return res.status( 400 ).json( new ApiError( "One or more values are invalid", errors ) );
    }

    const column = await ColumnService.createColumn( req.body );

    return res.status( 201 ).json( column );
};

/**
 * Updates a existing column
 *
 * @param {HttpRequest} req the request object
 * @param {HttpResponse} res the response object
 */
const updateColumn = async ( req, res ) => {
    if ( !validate.id( req.params.id ) ) {
        return res.status( 400 ).json( new ApiError( "Id is invalid" ) );
    }

    if ( Object.keys( req.body ).length === 0 ) {
        return res.status( 400 ).json( new ApiError( "One or more values are required" ) );
    }

    const errors = validate.update( req.body );
    if ( Object.keys( errors ).length > 0 ) {
        return res.status( 400 ).json( new ApiError( "One or more values are invalid", errors ) );
    }

    const column = await ColumnService.updateColumn( req.params.id, req.body );

    return res.status( 200 ).json( column );
};

/**
 * Deletes a column
 *
 * @param {HttpRequest} req the request object
 * @param {HttpResponse} res the response object
 */
const deleteColumn = async ( req, res ) => {
    if ( !validate.id( req.params.id ) ) {
        return res.status( 400 ).json( new ApiError( "Id is invalid" ) );
    }

    const column = await ColumnService.deleteColumn( req.params.id );

    if ( !column ) {
        return res.status( 404 ).json( new ApiError( "Column not found" ) );
    }

    return res.status( 204 ).send();
};

module.exports = {
    getColumns,
    getColumnById,
    createColumn,
    updateColumn,
    deleteColumn,
};
