/* eslint-disable complexity */

async function validateUpdateBoardRequest( req, res ) {
    const data = {};
    let badRequest = false;
    if ( !req.body.id ) {
        badRequest = true;
    }

    if ( !req.body.name && !req.body.status ) {
        badRequest = true;
    }

    if ( req.body.name ) {
        data.name = req.body.name;
    }

    if ( req.body.status ) {
        data.status = req.body.status;
    }
    if ( badRequest ) {
        return res.status( 400 ).json( { message: "Make sure the requests contains an id and the new changes!" } );
    }
    return data;
}

module.exports = {
    validateUpdateBoardRequest,
};
/* eslint-enable complexity */
