const { expect, should } = require( "chai" );
require( "dotenv" ).config();

const ColumnService = require( "../../src/services/ColumnService" );
const BoardService = require( "../../src/services/BoardService" );
const TaskService = require( "../../src/services/TaskService" );

let boardId;

describe( "ColumnService", () => {
    beforeEach( async () => {
        const newBoard = {
            name: "Board 1",
            project: "04625ae0-4ea0-4fcf-9f67-26125961b63f",
        };
        const { id } = await BoardService.createBoard( newBoard );

        boardId = id;
    } );

    describe( "getColumns", () => {
        beforeEach( async () => {
            const newColumn1 = {
                name: "Column 1",
                board: boardId,
            };
            const newColumn2 = {
                name: "Column 2",
                board: boardId,
            };

            await ColumnService.createColumn( newColumn1 );
            await ColumnService.createColumn( newColumn2 );
        } );

        it( "should return all columns", async () => {
            const columns = await ColumnService.getColumns();

            expect( columns.length ).to.equal( 4 );
        } );
    } );

    describe( "getColumnById", () => {
        it( "should return one column", async () => {
            const newColumn = {
                name: "Column 1",
                board: boardId,
            };
            const { id } = await ColumnService.createColumn( newColumn );

            const column = await ColumnService.getColumnById( id );

            expect( column.name ).to.equal( newColumn.name );
        } );

        it( "should return null if not found", async () => {
            const column = await ColumnService.getColumnById( "8d50a412-3f38-458e-be0e-06f0e084afb7" );

            should().not.exist( column );
        } );
    } );

    describe( "createColumn", () => {
        it( "should create a column", async () => {
            const newColumn = {
                name: "Column 1",
                board: boardId,
            };

            const column = await ColumnService.createColumn( newColumn );

            expect( column.name ).to.equal( newColumn.name );
        } );

        it( "should add the column to the board", async () => {
            const newColumn = {
                name: "Column 1",
                board: boardId,
            };
            const column = await ColumnService.createColumn( newColumn );

            const board = await BoardService.getBoardById( boardId );

            expect( board.columns.length ).to.equal( 3 );
            expect( board.columns[ 2 ].id ).to.equal( column.id );
            expect( board.columns[ 2 ].name ).to.equal( column.name );
        } );
    } );

    describe( "updateColumn", () => {
        it( "should update a column", async () => {
            const newColumn = {
                name: "Column 1",
                board: boardId,
            };
            const { id } = await ColumnService.createColumn( newColumn );

            const column = await ColumnService.updateColumn( id, {
                name: "Column 2",
            } );

            expect( column.name ).to.equal( "Column 2" );
        } );

        it( "should not update a column without column id", async () => {
            const column = await ColumnService.updateColumn( "invalid", {
                name: "Column 2",
            } );

            should().not.exist( column );
        } );
    } );

    describe( "deleteColumn", () => {
        it( "should delete a column", async () => {
            const newColumn = {
                name: "Column 1",
                board: boardId,
            };
            const { id } = await ColumnService.createColumn( newColumn );

            const column = await ColumnService.deleteColumn( id );

            expect( column.name ).to.equal( newColumn.name );
        } );

        it( "should remove column from board", async () => {
            const newColumn = {
                name: "Column 1",
                board: boardId,
            };
            const { id } = await ColumnService.createColumn( newColumn );

            const column = await ColumnService.deleteColumn( id );
            const board = await BoardService.getBoardById( boardId );

            expect( column.name ).to.equal( newColumn.name );
            expect( board.columns.length ).to.equal( 2 );
        } );

        it( "should delete a column task", async () => {
            const newColumn = {
                name: "Column 1",
                board: boardId,
            };
            const { id } = await ColumnService.createColumn( newColumn );
            await TaskService.createTask( {
                name: "Task 1",
                column: id,
            } );

            const column = await ColumnService.deleteColumn( id );
            const tasks = await TaskService.getTasks();

            expect( column.name ).to.equal( newColumn.name );
            expect( tasks.length ).to.equal( 0 );
        } );

        it( "should not delete column with invalid id", async () => {
            const column = await ColumnService.deleteColumn( "invalid" );

            should().not.exist( column );
        } );
    } );
} );
