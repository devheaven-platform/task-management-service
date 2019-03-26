const express = require( "express" );
const columnController = require( "../controllers/ColumnController" );

const router = express.Router();

router.post( "/create", columnController.createColumn );
router.delete( "/delete", columnController.deleteColumn );

module.exports = router;
