const express = require( "express" );
const boardController = require( "../controllers/BoardController" );

const router = express.Router();

router.post( "/create", boardController.createBoard );

module.exports = router;
