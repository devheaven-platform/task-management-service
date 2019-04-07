const express = require( "express" );
const boardController = require( "../controllers/BoardController" );

const router = express.Router();

router.get( "/:id", boardController.getBoardById );
router.get( "/getAll/:id", boardController.getAll );
router.post( "/create", boardController.createBoard );
router.put( "/update", boardController.updateBoard );
router.delete( "/delete/:id", boardController.deleteBoard );

module.exports = router;
