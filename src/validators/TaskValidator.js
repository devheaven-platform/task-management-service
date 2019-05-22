/* eslint complexity: 0 */
const validator = require( "validator" );

const GenericValidator = require( "./GenericValidator" );

/**
 * Validates the create task request
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

    if ( body.description !== undefined && body.description.trim() !== "" ) {
        if ( !GenericValidator.isString( body.description ) ) {
            errors.description = "Description must be of type string";
        } else if ( !validator.isLength( body.description, { min: 2, max: 250 } ) ) {
            errors.description = "Description must be between 2 and 250 characters";
        }
    }

    if ( !GenericValidator.isString( body.column ) || !GenericValidator.id( body.column ) ) {
        errors.column = "Column id is required";
    }

    return errors;
};

/**
 * Validates the update task request
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

    if ( body.description !== undefined && body.description.trim() !== "" ) {
        if ( !GenericValidator.isString( body.description ) ) {
            errors.description = "Description must be of type string";
        } else if ( !validator.isLength( body.description, { min: 2, max: 250 } ) ) {
            errors.description = "Description must be between 2 and 250 characters";
        }
    }

    if ( body.assignees !== undefined ) {
        if ( !GenericValidator.isArray( body.assignees ) ) {
            errors.assignees = "Assignees must be of type array";
        } else if ( body.assignees.filter( assigneeId => !GenericValidator.isString( assigneeId ) || !GenericValidator.id( assigneeId ) ).length > 0 ) {
            errors.assignees = "Assignees can only contain valid id's";
        }
    }

    if ( body.hours !== undefined ) {
        if ( !GenericValidator.isNumber( body.hours ) ) {
            errors.hours = "Hours must be of type number";
        } else if ( body.hours < 0 || body.hours > 100 ) {
            errors.hours = "Hours must be a value between 0 and 100";
        }
    }

    return errors;
};

module.exports = {
    id: GenericValidator.id,
    create,
    update,
};
