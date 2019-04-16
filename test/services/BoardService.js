const { expect, should } = require( "chai" );

const ColumnService = require( "../../src/services/ColumnService" );
const BoardService = require( "../../src/services/BoardService" );
const TaskService = require( "../../src/services/TaskService" );

describe( "BoardService", () => {
    describe( "getBoards", () => {
        before( async () => {
            const newBoard1 = {
                name: "Board 1",
                project: "8d50a412-3f38-458e-be0e-06f0e084afb7",
            };
            const newBoard2 = {
                name: "Board 2",
                project: "8d50a412-3f38-458e-be0e-06f0e084afb7",
            };

            await BoardService.createBoard( newBoard1 );
            await BoardService.createBoard( newBoard2 );
        } );

        it( "should return all boards", async () => {
            const boards = await BoardService.getBoards();

            expect( boards.length ).to.equal( 2 );
            expect( boards[ 0 ].name ).to.equal( "Board 1" );
            expect( boards[ 1 ].name ).to.equal( "Board 2" );
        } );
    } );

    describe( "getBoardById", () => {
        it( "should return one board", async () => {
            const newBoard = {
                name: "Board 1",
                project: "8d50a412-3f38-458e-be0e-06f0e084afb7",
            };
            const { id } = await BoardService.createBoard( newBoard );

            const board = await BoardService.getBoardById( id );

            expect( board.name ).to.equal( newBoard.name );
            expect( board.status ).to.equal( "Open" );
            expect( board.archived ).to.equal( false );
        } );

        it( "should return null if not found", async () => {
            const board = await BoardService.getBoardById( "8d50a412-3f38-458e-be0e-06f0e084afb7" );

            should().not.exist( board );
        } );
    } );

    describe( "createBoard", () => {
        it( "should create a board", async () => {
            const newBoard = {
                name: "Board 1",
                project: "8d50a412-3f38-458e-be0e-06f0e084afb7",
            };

            const board = await BoardService.createBoard( newBoard );

            expect( board.name ).to.equal( newBoard.name );
            expect( board.status ).to.equal( "Open" );
            expect( board.archived ).to.equal( false );
            should().exist( board.id );
        } );
    } );

    describe( "updateBoard", async () => {
        it( "should update a board", async () => {
            const newBoard = {
                name: "Board 1",
                project: "8d50a412-3f38-458e-be0e-06f0e084afb7",
            };
            const { id } = await BoardService.createBoard( newBoard );

            const board = await BoardService.updateBoard( id, {
                name: "Board 2",
                status: "Closed",
                archived: true,
            } );

            expect( board.name ).to.equal( "Board 2" );
            expect( board.status ).to.equal( "Closed" );
            expect( board.archived ).to.equal( true );
        } );

        it( "should update a board name only", async () => {
            const newBoard = {
                name: "Board 1",
                project: "8d50a412-3f38-458e-be0e-06f0e084afb7",
            };
            const { id } = await BoardService.createBoard( newBoard );

            const board = await BoardService.updateBoard( id, {
                name: "Board 2",
            } );

            expect( board.name ).to.equal( "Board 2" );
            expect( board.status ).to.equal( "Open" );
            expect( board.archived ).to.equal( false );
        } );

        it( "should update a board status only", async () => {
            const newBoard = {
                name: "Board 1",
                project: "8d50a412-3f38-458e-be0e-06f0e084afb7",
            };
            const { id } = await BoardService.createBoard( newBoard );

            const board = await BoardService.updateBoard( id, {
                status: "Closed",
            } );

            expect( board.name ).to.equal( "Board 1" );
            expect( board.status ).to.equal( "Closed" );
            expect( board.archived ).to.equal( false );
        } );

        it( "should update a board archived only", async () => {
            const newBoard = {
                name: "Board 1",
                project: "8d50a412-3f38-458e-be0e-06f0e084afb7",
            };
            const { id } = await BoardService.createBoard( newBoard );

            const board = await BoardService.updateBoard( id, {
                archived: true,
            } );

            expect( board.name ).to.equal( "Board 1" );
            expect( board.status ).to.equal( "Open" );
            expect( board.archived ).to.equal( true );
        } );

        it( "should not update a board without a board id", async () => {
            const board = await BoardService.updateBoard( "invalid", {
                name: "Board 2",
                status: "Closed",
                archived: true,
            } );

            should().not.exist( board );
        } );
    } );

    describe( "deleteBoard", () => {
        it( "should delete a board", async () => {
            const newBoard = {
                name: "Board 1",
                project: "8d50a412-3f38-458e-be0e-06f0e084afb7",
            };
            const { id } = await BoardService.createBoard( newBoard );

            const board = await BoardService.deleteBoard( id );

            expect( board.name ).to.equal( newBoard.name );
            expect( board.status ).to.equal( "Open" );
            expect( board.archived ).to.equal( false );
        } );

        it( "should delete board columns", async () => {
            const newBoard = {
                name: "Board 1",
                project: "8d50a412-3f38-458e-be0e-06f0e084afb7",
            };
            const { id } = await BoardService.createBoard( newBoard );
            await ColumnService.createColumn( {
                name: "Column 1",
                board: id,
            } );

            const board = await BoardService.deleteBoard( id );
            const columns = await ColumnService.getColumns();

            expect( board.name ).to.equal( newBoard.name );
            expect( board.status ).to.equal( "Open" );
            expect( board.archived ).to.equal( false );
            expect( columns.length ).to.equal( 0 );
        } );

        it( "should delete board tasks", async () => {
            const newBoard = {
                name: "Board 1",
                project: "8d50a412-3f38-458e-be0e-06f0e084afb7",
            };
            const { id } = await BoardService.createBoard( newBoard );
            const column = await ColumnService.createColumn( {
                name: "Column 1",
                board: id,
            } );
            await TaskService.createTask( {
                name: "Task 1",
                column: column.id,
            } );
            await TaskService.createTask( {
                name: "Task 2",
                column: column.id,
            } );
            await TaskService.createTask( {
                name: "Task 3",
                column: column.id,
            } );

            const board = await BoardService.deleteBoard( id );
            const tasks = await TaskService.getTasks();

            expect( board.name ).to.equal( newBoard.name );
            expect( board.status ).to.equal( "Open" );
            expect( board.archived ).to.equal( false );
            expect( tasks.length ).to.equal( 0 );
        } );

        it( "should not delete board with invalid id", async () => {
            const board = await BoardService.deleteBoard( "invalid" );

            should().not.exist( board );
        } );
    } );
} );
