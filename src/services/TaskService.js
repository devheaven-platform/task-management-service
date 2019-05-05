const Column = require( "../models/Column" );
const Task = require( "../models/Task" );

/**
 * Gets all tasks from the database
 *
 * @returns a list of tasks
 */
const getTasks = async () => Task.find();

/**
 * Gets one task from the database
 *
 * @returns the task or null
 */
const getTaskById = async id => Task.findById( id ).exec();

/**
 * Creates a new task
 *
 * @param {Object} newTask the task to add
 * @returns the new task or null if an error occurred
 */
const createTask = async ( newTask ) => {
    // Create task
    const task = await new Task( newTask ).save();

    // Append to column
    const column = await Column.findById( newTask.column ).exec();
    column.tasks.push( task.id );
    await column.save();

    return task;
};

/**
 * Updates a existing task
 *
 * @param {String} id the id of the task to update
 * @param {Object} task the updated task values
 * @returns the task board or null if an error occurred
 */
const updateTask = async ( id, task ) => Task.findOneAndUpdate( { _id: id }, task, { new: true } ).exec();

/**
 * Deletes a task from the database
 *
 * @param {String} id the id of the task to delete
 * @returns the deleted task or null if an error occurred
 */
const deleteTask = async ( id ) => {
    const task = await Task.findByIdAndRemove( id ).exec();
    if ( !task ) {
        return null;
    }

    const column = await Column.findOne( { tasks: task.id } ).exec();
    if ( column ) {
        column.tasks = column.tasks.filter( taskId => taskId !== task.id );
        await column.save();
    }

    return task;
};

module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
};
