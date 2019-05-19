/* eslint complexity: 0 */
const validator = require( "validator" );
const moment = require( "moment" );

const GenericValidator = require( "./GenericValidator" );

const get = ( params, query ) => {
    const errors = {};

    if ( params.projectId === undefined ) {
        errors.projectId = "Id is invalid";
    } else if ( !GenericValidator.id( params.projectId ) ) {
        errors.name = "Id must be of type UUID";
    }

    if ( query.start !== undefined ) {
        if ( !validator.isLength( query.start, { min: 1 } ) ) {
            errors.start = "Start date cannot be an empty value";
        } else if ( !moment.unix( query.start ).isValid() ) {
            errors.start = "Start date must be an unix value";
        }
    }

    if ( query.end !== undefined ) {
        errors.end = "End date is invalid";
        if ( !validator.isLength( query.end, { min: 1 } ) ) {
            errors.end = "End date cannot be an empty value";
        } else if ( !moment.unix( query.end ).isValid() ) {
            errors.end = "End date is must be an unix value";
        }
    }

    return errors;
};

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
    } if ( !GenericValidator.isString( body.name ) ) {
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
    get,
    create,
    update,
};
