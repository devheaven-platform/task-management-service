const passport = require( "passport" );

/**
 * Determines if a user is authenticated or not. If the user isn't authenticated
 * an 401 error will be returned. If the user is authenticated the req object will
 * recieve an user parameter to use in other middleware functions.
 *
 * @param {HttpRequest} req the request object
 * @param {HttpResponse} res the response object
 * @param {Function} next the callback for to call the next middleware function
 */
module.exports = ( req, res, next ) => {
    passport.authenticate( "jwt", { session: false }, ( error, user, info ) => {
        if ( error || !user || info ) {
            return res.status( 401 ).json( {
                message: "Your not authorized to access this resource",
            } );
        }

        req.user = user;
        return next();
    } )( req, res, next );
};
