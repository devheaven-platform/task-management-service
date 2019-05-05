const { expect, should } = require( "chai" );
require( "dotenv" ).config();

const ColumnService = require( "../../src/services/ColumnService" );
const BoardService = require( "../../src/services/BoardService" );
const TaskService = require( "../../src/services/TaskService" );

let columnId;

describe( "TaskService", () => {
    beforeEach( async () => {
        const newBoard = {
            name: "Board 1",
            project: "04625ae0-4ea0-4fcf-9f67-26125961b63f",
        };
        const board = await BoardService.createBoard( newBoard );

        const newColumn = {
            name: "Column 1",
            board: board.id,
        };
        const column = await ColumnService.createColumn( newColumn );

        columnId = column.id;
    } );

    describe( "getTasks", () => {
        beforeEach( async () => {
            const newTask1 = {
                name: "Task 1",
                column: columnId,
            };
            const newTask2 = {
                name: "Task 2",
                column: columnId,
            };

            await TaskService.createTask( newTask1 );
            await TaskService.createTask( newTask2 );
        } );

        it( "should return all tasks", async () => {
            const tasks = await TaskService.getTasks();

            expect( tasks.length ).to.equal( 2 );
            expect( tasks[ 0 ].name ).to.equal( "Task 1" );
            expect( tasks[ 1 ].name ).to.equal( "Task 2" );
        } );
    } );

    describe( "getTaskById", () => {
        it( "should return one task", async () => {
            const newTask = {
                name: "Task 1",
                column: columnId,
            };
            const { id } = await TaskService.createTask( newTask );

            const task = await TaskService.getTaskById( id );

            expect( task.name ).to.equal( newTask.name );
            expect( task.description ).to.equal( "" );
            expect( task.hours ).to.equal( 0 );
        } );

        it( "should return null if not found", async () => {
            const task = await TaskService.getTaskById( "8d50a412-3f38-458e-be0e-06f0e084afb7" );

            should().not.exist( task );
        } );
    } );

    describe( "createTask", () => {
        it( "should create a task", async () => {
            const newTask = {
                name: "Task 1",
                description: "Description 1",
                column: columnId,
            };

            const task = await TaskService.createTask( newTask );

            expect( task.name ).to.equal( newTask.name );
            expect( task.description ).to.equal( newTask.description );
            expect( task.hours ).to.equal( 0 );
        } );

        it( "should add the task to the column", async () => {
            const newTask = {
                name: "Task 1",
                description: "Description 1",
                column: columnId,
            };
            const task = await TaskService.createTask( newTask );

            const column = await ColumnService.getColumnById( columnId );

            expect( column.tasks.length ).to.equal( 1 );
            expect( column.tasks[ 0 ].id ).to.equal( task.id );
            expect( column.tasks[ 0 ].name ).to.equal( newTask.name );
            expect( column.tasks[ 0 ].description ).to.equal( newTask.description );
            expect( column.tasks[ 0 ].hours ).to.equal( 0 );
        } );
    } );

    describe( "updateTask", () => {
        it( "should update a task", async () => {
            const newTask = {
                name: "Task 1",
                description: "Description 1",
                column: columnId,
            };
            const { id } = await TaskService.createTask( newTask );

            const task = await TaskService.updateTask( id, {
                name: "Task 2",
                description: "Description 2",
                assignees: [
                    "c23d2040-c662-4ceb-929d-1416e85f3d8b",
                ],
                hours: 1,
            } );

            expect( task.name ).to.equal( "Task 2" );
            expect( task.description ).to.equal( "Description 2" );
            expect( task.assignees.length ).to.equal( 1 );
            expect( task.assignees[ 0 ] ).to.equal( "c23d2040-c662-4ceb-929d-1416e85f3d8b" );
            expect( task.hours ).to.equal( 1 );
        } );

        it( "should update a task only name", async () => {
            const newTask = {
                name: "Task 1",
                description: "Description 1",
                column: columnId,
            };
            const { id } = await TaskService.createTask( newTask );

            const task = await TaskService.updateTask( id, {
                name: "Task 2",
            } );

            expect( task.name ).to.equal( "Task 2" );
        } );

        it( "should update a task only description", async () => {
            const newTask = {
                name: "Task 1",
                description: "Description 1",
                column: columnId,
            };
            const { id } = await TaskService.createTask( newTask );

            const task = await TaskService.updateTask( id, {
                description: "Description 2",
            } );

            expect( task.description ).to.equal( "Description 2" );
        } );

        it( "should update a task only assignees", async () => {
            const newTask = {
                name: "Task 1",
                description: "Description 1",
                column: columnId,
            };
            const { id } = await TaskService.createTask( newTask );

            const task = await TaskService.updateTask( id, {
                assignees: [
                    "c23d2040-c662-4ceb-929d-1416e85f3d8b",
                ],
            } );

            expect( task.assignees.length ).to.equal( 1 );
            expect( task.assignees[ 0 ] ).to.equal( "c23d2040-c662-4ceb-929d-1416e85f3d8b" );
        } );

        it( "should update a task only hours", async () => {
            const newTask = {
                name: "Task 1",
                description: "Description 1",
                column: columnId,
            };
            const { id } = await TaskService.createTask( newTask );

            const task = await TaskService.updateTask( id, {
                hours: 1,
            } );

            expect( task.hours ).to.equal( 1 );
        } );

        it( "should not update a task without task id", async () => {
            const task = await TaskService.updateTask( "invalid", {
                name: "Task 2",
                description: "Description 2",
                assignees: [
                    "c23d2040-c662-4ceb-929d-1416e85f3d8b",
                ],
                hours: 1,
            } );

            should().not.exist( task );
        } );
    } );

    describe( "deleteTask", () => {
        it( "should delete a task", async () => {
            const newTask = {
                name: "Task 1",
                column: columnId,
            };
            const { id } = await TaskService.createTask( newTask );

            const task = await TaskService.deleteTask( id );

            expect( task.name ).to.equal( newTask.name );
        } );

        it( "should remove task from column", async () => {
            const newTask = {
                name: "Task 1",
                column: columnId,
            };
            const { id } = await TaskService.createTask( newTask );

            const task = await TaskService.deleteTask( id );
            const column = await ColumnService.getColumnById( columnId );

            expect( task.name ).to.equal( newTask.name );
            expect( column.tasks.length ).to.equal( 0 );
        } );

        it( "should not delete task with invalid id", async () => {
            const task = await TaskService.deleteTask( "invalid" );

            should().not.exist( task );
        } );
    } );
} );
