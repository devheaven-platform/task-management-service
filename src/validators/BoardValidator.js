/* eslint complexity: 0 */
const validator = require( "validator" );

const GenericValidator = require( "./GenericValidator" );

/**
 * Validates the create board request
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

    if ( !GenericValidator.isString( body.project ) || !GenericValidator.id( body.project ) ) {
        errors.project = "Project id is required";
    }

    return errors;
};

/**
 * Validates the update board request
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
        if ( !GenericValidator.isString( body.status ) ) {
            errors.status = "Status must be of type string";
        } else if ( body.status.trim() === "" ) {
            errors.status = "Status cannot be a empty string";
        } else if ( body.status !== "Open" && body.status !== "Closed" ) {
            errors.status = "Status must be 'Open' or 'Closed'";
        }
    }

    if ( body.archived !== undefined && !GenericValidator.isBoolean( body.archived ) ) {
        errors.archived = "Archived must be of type boolean";
    }

    return errors;
};

module.exports = {
    id: GenericValidator.id,
    create,
    update,
};
