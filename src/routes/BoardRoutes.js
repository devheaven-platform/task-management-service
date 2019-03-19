const express = require( "express" );
const boardController = require( "../controllers/BoardController" );

const router = express.Router();

router.post( "/create", boardController.createBoard );
router.delete( "/delete", boardController.deleteBoard );

module.exports = router;
