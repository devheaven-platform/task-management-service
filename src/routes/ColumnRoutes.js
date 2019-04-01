const express = require( "express" );
const columnController = require( "../controllers/ColumnController" );

const router = express.Router();

router.get( "/getColumns/:boardId", columnController.getColumnsForBoard );
router.post( "/create", columnController.createColumn );
router.delete( "/delete/:id", columnController.deleteColumn );

module.exports = router;
