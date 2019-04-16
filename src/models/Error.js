/**
 * @swagger
 * components:
 *   schemas:
 *     ApiError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: An message describing the error
 *           example: An error occurred
 *       required:
 *         - message
 *     ValidationError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: An message describing the error
 *           example: One or more values are invalid
 *         errors:
 *           type: object
 *           description: A map containing a the validation errors
 *           additionalProperties:
 *             type: string
 *           example:
 *             field: error
 *       required:
 *         - message
 *
 *   responses:
 *     BadRequest:
 *       description: BadRequest
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ValidationError'
 *     Unauthorized:
 *       description: Unauthorized
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ApiError'
 *     Forbidden:
 *       description: Forbidden
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ApiError'
 *     NotFound:
 *       description: NotFound
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ApiError'
 *     InternalServerError:
 *       description: Internal Server Error
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ApiError'
 */
class ApiError {
    constructor( message, errors ) {
        this.message = message;
        this.errors = errors;
    }
}

module.exports = ApiError;
