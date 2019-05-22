/* eslint complexity: 0 */
const validator = require( "validator" );

const GenericValidator = require( "./GenericValidator" );

/**
 * Validates the create column request
 *
 * @param {Object} body the body containing the values
 * @returns an error object containing the field errors
 */
const create = ( body ) => {
    const errors = {};

    if ( body.name === undefined ) {
        errors.name = "Name is required";
    } else if ( !GenericValidator.isString( body.name ) ) {
        errors.name = "Name must be of type string";
    } else if ( body.name.trim() === "" ) {
        errors.name = "Name cannot be a empty string";
    } else if ( !validator.isLength( body.name, { min: 2, max: 20 } ) ) {
        errors.name = "Name must be between 2 and 20 characters";
    }

    if ( !GenericValidator.isString( body.board ) || !GenericValidator.id( body.board ) ) {
        errors.board = "Board id is required";
    }

    return errors;
};

/**
 * Validates the update column request
 *
 * @param {Object} body the body containing the values
 * @returns an error object containing the field errors
 */
const update = ( body ) => {
    const errors = {};

    if ( body.name !== undefined ) {
        if ( !GenericValidator.isString( body.name ) ) {
            errors.name = "Name must be of type string";
        } else if ( body.name.trim() === "" ) {
            errors.name = "Name cannot be a empty string";
        } else if ( !validator.isLength( body.name, { min: 2, max: 20 } ) ) {
            errors.name = "Name must be between 2 and 20 characters";
        }
    }

    if ( body.status !== undefined ) {
        if ( !GenericValidator.isString( body.name ) ) {
            errors.status = "Status must be of type string";
        } else if ( body.status.trim() === "" ) {
            errors.status = "Status cannot be an empty string";
        } else if ( body.status !== "DONE" && body.status !== "CUSTOM" && body.status !== "TODO" ) {
            errors.status = "Status must be 'DONE', 'CUSTOM', or 'TODO'";
        }
    }

    return errors;
};

module.exports = {
    id: GenericValidator.id,
    create,
    update,
};
