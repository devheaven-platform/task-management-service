const TaskService = require( "../services/TaskService" );
const validate = require( "../validators/TaskValidator" );
const ApiError = require( "../models/Error" );

/**
 * Gets all the tasks from the database
 *
 * @param {HttpRequest} req the request object
 * @param {HttpResponse} res the response object
 */
const getTasks = async ( req, res ) => {
    const tasks = await TaskService.getTasks();
    return res.json( tasks );
};

/**
 * Gets one task by its id
 *
 * @param {HttpRequest} req the request object
 * @param {HttpResponse} res the response object
 */
const getTaskById = async ( req, res ) => {
    if ( !validate.id( req.params.id ) ) {
        return res.status( 400 ).json( new ApiError( "Id is invalid" ) );
    }

    const task = await TaskService.getTaskById( req.params.id );

    if ( !task ) {
        return res.status( 404 ).json( new ApiError( "Task not found" ) );
    }

    return res.json( task );
};

/**
 * Creates a new task
 *
 * @param {HttpRequest} req the request object
 * @param {HttpResponse} res the response object
 */
const createTask = async ( req, res ) => {
    const errors = validate.create( req.body );

    if ( Object.keys( errors ).length > 0 ) {
        return res.status( 400 ).json( new ApiError( "One or more values are invalid", errors ) );
    }

    const task = await TaskService.createTask( req.body );

    return res.status( 201 ).json( task );
};

/**
 * Updates a existing task
 *
 * @param {HttpRequest} req the request object
 * @param {HttpResponse} res the response object
 */
const updateTask = async ( req, res ) => {
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

    const task = await TaskService.updateTask( req.params.id, req.body );

    return res.status( 200 ).json( task );
};

/**
 * Deletes a task
 *
 * @param {HttpRequest} req the request object
 * @param {HttpResponse} res the response object
 */
const deleteTask = async ( req, res ) => {
    if ( !validate.id( req.params.id ) ) {
        return res.status( 400 ).json( new ApiError( "Id is invalid" ) );
    }

    const task = await TaskService.deleteTask( req.params.id );

    if ( !task ) {
        return res.status( 404 ).json( new ApiError( "Task not found" ) );
    }

    return res.status( 204 ).send();
};

module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
};
