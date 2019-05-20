const express = require( "express" );

const asyncMiddleware = require( "../config/middleware/Async" );
const controller = require( "../controllers/BoardController" );

/**
 * @swagger
 * tags:
 *   - name: Boards
 *     description: All board related routes
 */
const router = express.Router();

/**
 * @swagger
 * /boards/:
 *    get:
 *      operationId: GetBoards
 *      summary: Returns a list of boards
 *      responses:
 *          '200':
 *            description: OK
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Board'
 *          '401':
 *            $ref: '#/components/responses/Unauthorized'
 *          '500':
 *            $ref: '#/components/responses/InternalServerError'
 *      tags:
 *        - Boards
 */
router.get( "/", asyncMiddleware( controller.getBoards ) );

/**
 * @swagger
 * /boards/for/{projectId}:
 *    get:
 *      operationId: GetBoardsForProject
 *      summary: Returns a list of all the finished tasks in a board
 *      parameters:
 *        - in: path
 *          name: projectId
 *          description: Id of the project to retrieve the boards of
 *          schema:
 *            type: string
 *            required: true
 *        - in: query
 *          name: start
 *          description: Date the finished tasks should be after.
 *          schema:
 *            type: date
 *        - in: query
 *          name: end
 *          description: Date the finished tasks should be before.
 *          schema:
 *            type: date
 *      responses:
 *          '200':
 *            description: OK
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Board'
 *          '401':
 *            $ref: '#/components/responses/Unauthorized'
 *          '500':
 *            $ref: '#/components/responses/InternalServerError'
 *      tags:
 *        - Boards
 */
router.get( "/for/:projectId", asyncMiddleware( controller.getBoardsForProject ) );

/**
 * @swagger
 * /boards/{id}:
 *    get:
 *      operationId: GetBoardById
 *      summary: Returns one board
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: Id of the board to retrieve
 *      responses:
 *          '200':
 *            description: OK
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Board'
 *          '400':
 *            $ref: '#/components/responses/BadRequest'
 *          '401':
 *            $ref: '#/components/responses/Unauthorized'
 *          '404':
 *            $ref: '#/components/responses/NotFound'
 *          '500':
 *            $ref: '#/components/responses/InternalServerError'
 *      tags:
 *        - Boards
 */
router.get( "/:id", asyncMiddleware( controller.getBoardById ) );

/**
 * @swagger
 * /boards/:
 *    post:
 *      operationId: CreateBoard
 *      summary: Create a board
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  description: The name of the board
 *                  example: Sprint 1
 *                project:
 *                  type: string
 *                  description: The id of the project
 *                  example: 55417624-c159-4eab-9260-d4679a2e9b31
 *              required:
 *                - name
 *                - project
 *      responses:
 *          '201':
 *            description: Created
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Board'
 *          '400':
 *            $ref: '#/components/responses/BadRequest'
 *          '401':
 *            $ref: '#/components/responses/Unauthorized'
 *          '500':
 *            $ref: '#/components/responses/InternalServerError'
 *      tags:
 *        - Boards
 */
router.post( "/", asyncMiddleware( controller.createBoard ) );

/**
 * @swagger
 * /boards/{id}:
 *    patch:
 *      operationId: UpdateBoard
 *      summary: Update one board
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: Id of the board to update
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  description: The name of the board
 *                  example: Sprint 1
 *                status:
 *                  type: string
 *                  enum: [Open, Closed]
 *                  description: The status of the board
 *                  example: Open
 *                archived:
 *                  type: boolean
 *                  description: Whether the board is archived
 *                  example: false
 *      responses:
 *          '200':
 *            description: OK
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Board'
 *          '400':
 *            $ref: '#/components/responses/BadRequest'
 *          '401':
 *            $ref: '#/components/responses/Unauthorized'
 *          '404':
 *            $ref: '#/components/responses/NotFound'
 *          '500':
 *            $ref: '#/components/responses/InternalServerError'
 *      tags:
 *        - Boards
 */
router.patch( "/:id", asyncMiddleware( controller.updateBoard ) );

/**
 * @swagger
 * /boards/{id}:
 *    delete:
 *      operationId: DeleteBoard
 *      summary: Delete one board
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: Id of the board to delete
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
 *        - Boards
 */
router.delete( "/:id", asyncMiddleware( controller.deleteBoard ) );

module.exports = router;
