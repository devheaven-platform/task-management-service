/**
 * Wraps the express route handlers so that error will be passed
 * to the next function.
 *
 * @param {Function} fn the function to wrap
 */
const asyncMiddleware = fn => ( req, res, next ) => {
    Promise.resolve( fn( req, res, next ) )
        .catch( next );
};

module.exports = asyncMiddleware;
