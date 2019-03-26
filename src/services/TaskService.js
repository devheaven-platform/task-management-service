const Task = require( "../models/Task" );

/**
 * Adds a task to the given column with the specified name and description.
 * @param columnId, The id of the column
 * @param name, The name of the task
 * @param description, The description of the task
 */
async function createTask( columnId, name, description ) {
    if ( !columnId ) return null;
    if ( !name ) return null;

    let taskDescription = "";
    if ( description ) {
        taskDescription = description;
    }

    try {
        const task = new Task();
        task.columnId = columnId;
        task.name = name;
        task.description = taskDescription;
        await task.save();

        return task;
    } catch ( e ) {
        return null;
    }
}

/**
 * Deletes a board from the database.
 * @param {String} id, the id of the board.
 */
async function deleteTask( id ) {
    try {
        if ( id ) {
            await Task.deleteOne( { _id: id } ).exec();
            return true;
        }
        return false;
    } catch ( e ) {
        return false;
    }
}

/**
 * Gets all the tasks for a column.
 * @param {String} columnId, the id of the column.
 */
async function getTasksForColumn( columnId ) {
    try {
        const tasks = await Task.find( { columnId } ).exec();
        return tasks;
    } catch ( e ) {
        return null;
    }
}

module.exports = {
    createTask, deleteTask, getTasksForColumn,
};
