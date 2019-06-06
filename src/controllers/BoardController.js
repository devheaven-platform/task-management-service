const BoardService = require( "../services/BoardService" );
const validate = require( "../validators/BoardValidator" );
const ApiError = require( "../models/Error" );

/**
 * Gets all the boards from the database
 *
 * @param {HttpRequest} req the request object
 * @param {HttpResponse} res the response object
 */
const getBoards = async ( req, res ) => {
    const boards = await BoardService.getBoards();
    return res.json( boards );
};

/**
 * Gets all the boards from a respective project
 *
 * @param {HttpRequest} req the request object
 * @param {HttpResponse} res the response object
 */
const getBoardsForProject = async ( req, res ) => {
    const errors = validate.get( req.params, req.query );

    if ( Object.keys( errors ).length > 0 ) {
        return res.status( 400 ).json( new ApiError( "One or more values are invalid", errors ) );
    }

    const result = await BoardService.getFinishedBoardTasks( req.params.projectId, req.query.start, req.query.end, req.headers.authorization );
    return res.json( result );
};

/**
 * Gets one board by its id
 *
 * @param {HttpRequest} req the request object
 * @param {HttpResponse} res the response object
 */
const getBoardById = async ( req, res ) => {
    if ( !validate.id( req.params.id ) ) {
        return res.status( 400 ).json( new ApiError( "Id is invalid" ) );
    }

    const board = await BoardService.getBoardById( req.params.id );

    if ( !board ) {
        return res.status( 404 ).json( new ApiError( "Board not found" ) );
    }

    return res.json( board );
};

/**
 * Creates a new board
 *
 * @param {HttpRequest} req the request object
 * @param {HttpResponse} res the response object
 */
const createBoard = async ( req, res ) => {
    const errors = validate.create( req.body );

    if ( Object.keys( errors ).length > 0 ) {
        return res.status( 400 ).json( new ApiError( "One or more values are invalid", errors ) );
    }

    const board = await BoardService.createBoard( req.body );

    return res.status( 201 ).json( board );
};

/**
 * Updates a existing board
 *
 * @param {HttpRequest} req the request object
 * @param {HttpResponse} res the response object
 */
const updateBoard = async ( req, res ) => {
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

    const board = await BoardService.updateBoard( req.params.id, req.body );

    return res.status( 200 ).json( board );
};

/**
 * Deletes a board
 *
 * @param {HttpRequest} req the request object
 * @param {HttpResponse} res the response object
 */
const deleteBoard = async ( req, res ) => {
    if ( !validate.id( req.params.id ) ) {
        return res.status( 400 ).json( new ApiError( "Id is invalid" ) );
    }

    const board = await BoardService.deleteBoard( req.params.id );

    if ( !board ) {
        return res.status( 404 ).json( new ApiError( "Board not found" ) );
    }

    return res.status( 204 ).send();
};

module.exports = {
    getBoards,
    getBoardById,
    getBoardsForProject,
    createBoard,
    updateBoard,
    deleteBoard,
};
