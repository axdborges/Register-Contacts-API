import app from './app';
import AppDataSource from './data-source';

(async () => {
  await AppDataSource.initialize()
    .then((_) => console.log('Database running'))
    .catch((err) => console.error('Database not running', err));

  app.listen(process.env.PORT || 3003, () => {
    console.log('Server running');
  });
})();