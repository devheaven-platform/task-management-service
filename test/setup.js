const mongoose = require( "mongoose" );
const { MongoMemoryServer } = require( "mongodb-memory-server" );
const sinon = require( "sinon" );

const { MessageProducer } = require( "../src/config/messaging/Kafka" );

let mongoServer;

before( ( done ) => {
    mongoServer = new MongoMemoryServer();
    mongoServer.getConnectionString()
        .then( mongoUri => mongoose.connect( mongoUri, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
        } )
            .then( done() )
            .catch( error => done( error ) ) );
    sinon.stub( MessageProducer.prototype, "send" ).callsFake( () => {} );
} );

after( () => {
    mongoose.disconnect();
    mongoServer.stop();
} );

afterEach( async () => {
    await mongoose.connection.dropDatabase();
} );
