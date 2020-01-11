const appRootDir = require('app-root-dir');
const path = require('path');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'decktool.app',
      version: '0.0.1',
      description: 'api for deck builder card games',
    },
    components: {},
  },
  apis: [`${path.resolve(appRootDir.get(), 'server')}/**/*.js`],
};

function useSwagger(app) {
  const swaggerSpec = swaggerJSDoc(options);

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = useSwagger;
