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
    if ( !req.params.id ) {
        return res.status( 400 ).json( { message: "Specify id to delete!" } );
    }

    const result = await TaskService.deleteTask( req.body.id );
    if ( result ) {
        return res.status( 204 ).json( { message: "Task was successfully deleted." } );
    }
    return res.status( 500 ).json( { message: "Something went wrong while trying to delete the task!" } );
}

/**
 * Retrieves all the columns for the given column id.
 * @param {HTTPRequest} req, the request
 * @param {HTTPResponse} res, the response
 */
async function getTasksForColumn( req, res ) {
    if ( !req.params.columnId ) {
        return res.status( 400 ).json( { message: "Specify a column id!" } );
    }

    const result = await TaskService.getTasksForColumn( req.params.columnId );
    if ( result ) {
        return res.status( 200 ).json( { message: "Tasks were successfully retrieved.", result } );
    }
    return res.status( 500 ).json( { message: "Something went wrong while trying to get the columns for the board!" } );
}

/**
 * Updates the board with the given values.
 * @param {HTTPRequest} req, the request
 * @param {HTTPResponse} res, the response
 */
// eslint-disable-next-line complexity
async function updateTask( req, res ) {
    if ( !req.body.id ) {
        return res.status( 400 ).json( { message: "Specify id to update!" } );
    }

    if ( !req.body.name && !req.body.columnId && !req.body.description && !req.body.assignees && !req.body.hours ) {
        return res.status( 400 ).json( { message: "Specify the new changes to add!" } );
    }

    const task = await TaskService
        .updateTask( req.body.id, {
            name: req.body.name, status: req.body.status, assignees: req.body.assignees, hours: req.body.hours,
        } );
    if ( task ) {
        return res.status( 200 ).json( { message: "Task updated.", task } );
    }
    return res.status( 500 ).json( { message: "Something went wrong while trying to update the board!" } );
}

module.exports = {
    createTask, deleteTask, getTasksForColumn, updateTask,
};
