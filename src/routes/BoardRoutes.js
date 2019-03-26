const express = require( "express" );
const boardController = require( "../controllers/BoardController" );

const router = express.Router();

router.post( "/create", boardController.createBoard );
router.get("/getAll", boardController.getAll);

module.exports = router;
