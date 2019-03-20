// const validator = require( "validator" );

/* eslint-disable complexity */

/**
 * The body that needs to be checked.
 * @param {*} input, the input to check.
 */
const validateUpdateBody = ( input ) => {
    const errors = {};
    const data = { body: {}, columns: {} };

    if ( input.id === undefined || input.id.trim() === "" ) {
        errors.id = "The id is required.";
    } else {
        data.id = input.id;
    }

    if ( input.name === undefined || input.name.trim() === "" ) {
        errors.name = "The name was empty";
    } else {
        data.body.name = input.name;
    }

    if ( input.columns === undefined || input.columns.length === 0 ) {
        errors.columns = "The columns were empty.";
    } else {
        data.columns = input.columns;
    }

    if ( input.status === undefined || input.status.trim() === "" ) {
        errors.status = "The status value was empty.";
    } else {
        data.body.status = input.status;
    }

    if ( data.id !== undefined && ( input.name || input.status || input.columns ) ) {
        return { data, updatable: true };
    }
    return { errors, updatable: false };
};
/* eslint-enable complexity */

module.exports = {
    validateUpdateBody,
};
