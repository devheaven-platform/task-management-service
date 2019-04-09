const express = require( "express" );
const taskController = require( "../controllers/TaskController" );

const router = express.Router();

router.post( "/create", taskController.createTask );
router.delete( "/delete/:id", taskController.deleteTask );
router.get( "/getTasks/:columnId", taskController.getTasksForColumn );
router.put( "/update", taskController.updateTask );

module.exports = router;
