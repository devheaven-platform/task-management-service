const Task = require( "../models/Task" );

/**
 * Adds a task to the given column with the specified name and description.
 * @param columnId, The id of the column
 * @param name, The name of the task
 * @param description, The description of the task
 */
async function createColumn( columnId, name, description ) {
    if ( !columnId ) return null;

    let taskName = "Default";
    if ( name ) {
        taskName = name;
    }

    let taskDescription = "";
    if ( name ) {
        taskDescription = description;
    }

    const task = new Task();
    task.columnId = columnId;
    task.name = taskName;
    task.description = taskDescription;
    await task.save();

    return task;
}

/**
 * Deletes a board from the database.
 * @param {String} id, the id of the board.
 */
async function deleteColumn( id ) {
    try {
        await Task.deleteOne( { _id: id } ).exec();
        return true;
    } catch ( e ) {
        return false;
    }
}

module.exports = {
    createColumn, deleteColumn,
};
