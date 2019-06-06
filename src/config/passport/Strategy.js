const { Strategy, ExtractJwt } = require( "passport-jwt" );

/**
 * Determines the strategy for passport.
 *
 * @param {Object} passport the passport instance
 * @param {String} secret the secret key to sign JWT tokens
 */
module.exports = ( passport, secret ) => {
    const options = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: secret,
    };

    passport.use( new Strategy( options, ( payload, done ) => {
        const date = new Date( 0 );
        date.setUTCSeconds( payload.exp );

        if ( date.getTime() > Date.now() ) {
            return done( null, {
                id: payload.sub,
                roles: payload.roles,
            } );
        }
        return done( null, false );
    } ) );
};
