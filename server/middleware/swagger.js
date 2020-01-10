const appRootDir = require('app-root-dir');
const path = require('path');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    info: {
      title: 'hello world',
      version: '1.0.0',
    },
  },
  apis: [`${path.resolve(appRootDir.get(), 'server')}/**/*.js`],
};

function useSwagger(app) {
  const swaggerSpec = swaggerJSDoc(options);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = useSwagger;
