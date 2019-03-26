const express = require( "express" );
const boardController = require( "../controllers/BoardController" );

const router = express.Router();

router.post( "/create", boardController.createBoard );
router.delete( "/delete", boardController.deleteBoard );
router.put( "/update", boardController.updateBoard );
router.get("/getAll", boardController.getAll);

module.exports = router;
