const swaggerJsdoc = require( "swagger-jsdoc" );

const options = {
    swaggerDefinition: {
        info: {
            title: "Task Management",
            version: "1.0.0",
            description: "Task Management API for the DevHeaven platform",
            contact: {
                name: "DevHeaven",
                url: "http://devheaven.nl",
                email: "devheavenplatform@gmail.com",
            },
        },
        openapi: "3.0.1",
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
    },
    apis: [
        "./src/routes/*.js",
        "./src/models/*.js",
    ],
};

module.exports = swaggerJsdoc( options );
