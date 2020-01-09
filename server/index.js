const app = require('./app');

const logger = log.child({ name: 'root' });

app.listen(process.env.PORT, () => {
  logger.warn('started on port=%s', process.env.PORT);
});
