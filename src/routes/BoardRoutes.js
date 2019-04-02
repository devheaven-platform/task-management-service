const express = require( "express" );
const boardController = require( "../controllers/BoardController" );

const router = express.Router();

<<<<<<< HEAD
router.get( "/getAll/:id", boardController.getAll );
=======
router.get( "/:id", boardController.getBoardById );
router.get( "/getAll/:projectId", boardController.getAll );
>>>>>>> Add validator and get board with populated arrays
router.post( "/create", boardController.createBoard );
router.put( "/update", boardController.updateBoard );
router.delete( "/delete/:id", boardController.deleteBoard );

module.exports = router;
