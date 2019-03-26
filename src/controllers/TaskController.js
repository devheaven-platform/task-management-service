const TaskService = require( "../services/TaskService" );

/**
 * Creates a task.
 * @param {HTTPRequest} req, the request
 * @param {HTTPResponse} res, the response
 */
async function createTask( req, res ) {
    const board = await TaskService.createTask( req.body.columnId,
        req.body.name, req.body.description );
    if ( !req.body.boardId ) {
        return res.status( 403 ).json( { message: "Specify columnId" } );
    }

    return res.json( { message: "Created the task!", board } );
}

/**
 * Deletes a task
 * @param {HTTPRequest} req, the request
 * @param {HTTPResponse} res, the response
 */
async function deleteTask( req, res ) {
    const result = await TaskService.deleteTask( req.body.id );
    if ( result ) {
        res.status( 204 );
    } else {
        res.status( 403 );
        res.json( { message: "Something went wrong while trying to delete the task!" } );
    }
}

module.exports = {
    createTask, deleteTask,
};
