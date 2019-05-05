const express = require( "express" );

const asyncMiddleware = require( "../config/middleware/Async" );
const controller = require( "../controllers/TaskController" );

/**
 * @swagger
 * tags:
 *   - name: Tasks
 *     description: All task related routes
 */
const router = express.Router();

/**
 * @swagger
 * /tasks/:
 *    get:
 *      operationId: GetTasks
 *      summary: Returns a list of tasks
 *      responses:
 *          '200':
 *            description: OK
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Task'
 *          '401':
 *            $ref: '#/components/responses/Unauthorized'
 *          '500':
 *            $ref: '#/components/responses/InternalServerError'
 *      tags:
 *        - Tasks
 */
router.get( "/", asyncMiddleware( controller.getTasks ) );

/**
 * @swagger
 * /tasks/{id}:
 *    get:
 *      operationId: GetTaskById
 *      summary: Returns one task
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: Id of the task to retrieve
 *      responses:
 *          '200':
 *            description: OK
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Task'
 *          '400':
 *            $ref: '#/components/responses/BadRequest'
 *          '401':
 *            $ref: '#/components/responses/Unauthorized'
 *          '404':
 *            $ref: '#/components/responses/NotFound'
 *          '500':
 *            $ref: '#/components/responses/InternalServerError'
 *      tags:
 *        - Tasks
 */
router.get( "/:id", asyncMiddleware( controller.getTaskById ) );

/**
 * @swagger
 * /tasks/:
 *    post:
 *      operationId: CreateTask
 *      summary: Create a task
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  description: The name of the task
 *                  example: Task 1
 *                description:
 *                  type: string
 *                  description: The description of the task
 *                  example: This task ...
 *                column:
 *                  type: string
 *                  description: The id of the column
 *                  example: 55417624-c159-4eab-9260-d4679a2e9b31
 *              required:
 *                - name
 *                - column
 *      responses:
 *          '204':
 *            description: Created
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Task'
 *          '400':
 *            $ref: '#/components/responses/BadRequest'
 *          '401':
 *            $ref: '#/components/responses/Unauthorized'
 *          '500':
 *            $ref: '#/components/responses/InternalServerError'
 *      tags:
 *        - Tasks
 */
router.post( "/", asyncMiddleware( controller.createTask ) );

/**
 * @swagger
 * /tasks/{id}:
 *    patch:
 *      operationId: UpdateTask
 *      summary: Update one task
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: Id of the task to update
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  description: The name of the task
 *                  example: Task 1
 *                description:
 *                  type: string
 *                  description: The description of the task
 *                  example: This task ...
 *                assignees:
 *                  type: array
 *                  description: A list of user id's assigned to the task
 *                  items:
 *                    type: string
 *                hours:
 *                  type: number
 *                  description: The amount of hours a task should take
 *                  example: 2
 *                position:
 *                  type: number
 *                  description: The position of the task
 *                  example: 1
 *      responses:
 *          '200':
 *            description: OK
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Task'
 *          '400':
 *            $ref: '#/components/responses/BadRequest'
 *          '401':
 *            $ref: '#/components/responses/Unauthorized'
 *          '404':
 *            $ref: '#/components/responses/NotFound'
 *          '500':
 *            $ref: '#/components/responses/InternalServerError'
 *      tags:
 *        - Tasks
 */
router.patch( "/:id", asyncMiddleware( controller.updateTask ) );

/**
 * @swagger
 * /tasks/{id}:
 *    delete:
 *      operationId: DeleteTask
 *      summary: Delete one task
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: Id of the task to delete
 *      responses:
 *          '204':
 *            description: No Content
 *          '401':
 *            $ref: '#/components/responses/Unauthorized'
 *          '404':
 *            $ref: '#/components/responses/NotFound'
 *          '500':
 *            $ref: '#/components/responses/InternalServerError'
 *      tags:
 *        - Tasks
 */
router.delete( "/:id", asyncMiddleware( controller.deleteTask ) );

module.exports = router;
