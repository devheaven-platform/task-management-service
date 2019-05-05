const { Kafka } = require( "kafkajs" );

const logger = require( "../logger/Logger" );
const converter = require( "../logger/Converter" );

const errors = [ "unhandledRejection", "uncaughtException" ];
const signals = [ "SIGTERM", "SIGINT", "SIGUSR2" ];
const env = process.env.NODE_ENV;
const host = process.env.KAFKA_HOST;
const groupId = process.env.KAFKA_GROUP_ID;

const kafka = new Kafka( {
    brokers: [ host ],
    logCreator: level => ( { log } ) => {
        const { message, ...rest } = log;
        logger.log( {
            level: converter.toLogLevel( level ),
            message,
            ...rest,
        } );
    },
} );

class MessageConsumer {
    /**
     * Constructor for the message consumer.
     *
     * @param {String} topic the topic to listen on.
     * @param {Function} handler the handler function to call.
     */
    constructor( topic, handler ) {
        if ( env !== "test" ) {
            this.topic = topic;
            this.handler = handler;
            this.consumer = kafka.consumer( { groupId } );

            this.connect().catch( error => logger.error( error.stack ) );

            this.handleError();
            this.handleExit();
        }
    }

    /**
     * Connects the consumer to the kafka server.
     */
    async connect() {
        await this.consumer.connect();
        await this.consumer.subscribe( { topic: this.topic } );
        await this.consumer.run( {
            eachMessage: async ( { message } ) => this.handler( JSON.parse( message.value ) ),
        } );
    }

    /**
     * Handles errors on the kafka server.
     */
    handleError() {
        errors.map( type => process.on( type, async ( error ) => {
            try {
                logger.error( error.stack );
                await this.consumer.disconnect();
                process.exit( 0 );
            } catch ( _ ) {
                process.exit( 1 );
            }
        } ) );
    }

    /**
     * Handles exit event.
     */
    handleExit() {
        signals.map( type => process.once( type, async () => {
            try {
                await this.consumer.disconnect();
            } finally {
                process.kill( process.pid, type );
            }
        } ) );
    }
}

class MessageProducer {
    constructor() {
        if ( env !== "test" ) {
            this.producer = kafka.producer();

            this.connect();

            this.handleError();
            this.handleExit();
        }
    }

    /**
     * Connects the producer to the kafka server.
     */
    async connect() {
        await this.producer.connect();
    }

    /**
     * The sends a message to a topic.
     *
     * @param {String} topic the topic to send the message to.
     * @param {String} message the message to send.
     */
    send( topic, message ) {
        return this.producer.send( {
            topic,
            messages: [
                { value: JSON.stringify( message ) },
            ],
        } );
    }

    /**
     * Handles errors on the kafka server.
     */
    handleError() {
        errors.map( type => process.on( type, async ( processError ) => {
            try {
                logger.error( processError.stack );
                await this.producer.disconnect();
                process.exit( 0 );
            } catch ( _ ) {
                process.exit( 1 );
            }
        } ) );
    }

    /**
     * Handles exit event.
     */
    handleExit() {
        signals.map( type => process.once( type, async () => {
            try {
                await this.producer.disconnect();
            } finally {
                process.kill( process.pid, type );
            }
        } ) );
    }
}

module.exports = {
    MessageConsumer,
    MessageProducer,
};
