const express = require( "express" );

const asyncMiddleware = require( "../config/middleware/Async" );
const authMiddleware = require( "../config/middleware/Auth" );
const controller = require( "../controllers/ColumnController" );

/**
 * @swagger
 * tags:
 *   - name: Columns
 *     description: All column related routes
 */
const router = express.Router();

/**
 * @swagger
 * /columns/:
 *    get:
 *      operationId: GetColumns
 *      summary: Returns a list of columns
 *      responses:
 *          '200':
 *            description: OK
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Column'
 *          '401':
 *            $ref: '#/components/responses/Unauthorized'
 *          '500':
 *            $ref: '#/components/responses/InternalServerError'
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - Columns
 */
router.get( "/", authMiddleware, asyncMiddleware( controller.getColumns ) );

/**
 * @swagger
 * /columns/{id}:
 *    get:
 *      operationId: GetColumnById
 *      summary: Returns one column
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: Id of the column to retrieve
 *      responses:
 *          '200':
 *            description: OK
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Column'
 *          '400':
 *            $ref: '#/components/responses/BadRequest'
 *          '401':
 *            $ref: '#/components/responses/Unauthorized'
 *          '404':
 *            $ref: '#/components/responses/NotFound'
 *          '500':
 *            $ref: '#/components/responses/InternalServerError'
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - Columns
 */
router.get( "/:id", authMiddleware, asyncMiddleware( controller.getColumnById ) );

/**
 * @swagger
 * /columns/:
 *    post:
 *      operationId: CreateColumn
 *      summary: Create a column
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  description: The name of the column
 *                  example: To Do
 *                board:
 *                  type: string
 *                  description: The id of the board
 *                  example: 55417624-c159-4eab-9260-d4679a2e9b31
 *              required:
 *                - name
 *                - board
 *      responses:
 *          '204':
 *            description: Created
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Column'
 *          '400':
 *            $ref: '#/components/responses/BadRequest'
 *          '401':
 *            $ref: '#/components/responses/Unauthorized'
 *          '500':
 *            $ref: '#/components/responses/InternalServerError'
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - Columns
 */
router.post( "/", authMiddleware, asyncMiddleware( controller.createColumn ) );

/**
 * @swagger
 * /columns/{id}:
 *    patch:
 *      operationId: UpdateColumn
 *      summary: Update one column
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: Id of the column to update
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  description: The name of the column
 *                  example: To Do
 *      responses:
 *          '200':
 *            description: OK
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Column'
 *          '400':
 *            $ref: '#/components/responses/BadRequest'
 *          '401':
 *            $ref: '#/components/responses/Unauthorized'
 *          '404':
 *            $ref: '#/components/responses/NotFound'
 *          '500':
 *            $ref: '#/components/responses/InternalServerError'
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - Columns
 */
router.patch( "/:id", authMiddleware, asyncMiddleware( controller.updateColumn ) );

/**
 * @swagger
 * /columns/{id}:
 *    delete:
 *      operationId: DeleteColumn
 *      summary: Delete one column
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: Id of the column to delete
 *      responses:
 *          '204':
 *            description: No Content
 *          '401':
 *            $ref: '#/components/responses/Unauthorized'
 *          '404':
 *            $ref: '#/components/responses/NotFound'
 *          '500':
 *            $ref: '#/components/responses/InternalServerError'
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - Columns
 */
router.delete( "/:id", authMiddleware, asyncMiddleware( controller.deleteColumn ) );

module.exports = router;
