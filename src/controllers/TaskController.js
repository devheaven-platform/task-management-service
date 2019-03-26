const TaskService = require( "../services/TaskService" );

/**
 * Creates a task.
 * @param {HTTPRequest} req, the request
 * @param {HTTPResponse} res, the response
 */
async function createTask( req, res ) {
    if ( !req.body.columnId ) {
        return res.status( 400 ).json( { message: "Specify columnId" } );
    }

    if ( !req.body.name ) {
        return res.status( 400 ).json( { message: "Specify name" } );
    }

    const task = await TaskService.createTask( req.body.columnId,
        req.body.name, req.body.description );
    if ( task ) {
        res.status( 201 );
        return res.json( { message: "Created the task!", task } );
    }
    return res.status( 500 ).json( { message: "Something went wrong while trying to create the task." } );
}

/**
 * Deletes a task
 * @param {HTTPRequest} req, the request
 * @param {HTTPResponse} res, the response
 */
async function deleteTask( req, res ) {
    if ( !req.body.id ) {
        return res.status( 400 ).json( { message: "Specify id to delete!" } );
    }

    const result = await TaskService.deleteTask( req.body.id );
    if ( result ) {
        return res.status( 204 ).json( { message: "Task was successfully deleted." } );
    }
    return res.status( 500 ).json( { message: "Something went wrong while trying to delete the task!" } );
}

module.exports = {
    createTask, deleteTask,
};
