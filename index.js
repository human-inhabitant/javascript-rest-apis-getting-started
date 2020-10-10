const debug = require('debug')('app');
const express = require('express');
const pieRepo = require('./repos/pieRepo');

const app = express();
const router = express.Router();
const port = process.env.PORT || 3e3;

router
  .get('/', (req, res, next) => {
    pieRepo.get((data) => {
      res
        .status(200)
        .json({
          status: 200,
          statusText: 'OK',
          message: 'All pies retrieved.',
          data
        });
    }, (err) => {
      next(err);
    });
  });
router
  .get('/search', (req, res, next) => {
    const searchObject = {
      id: parseInt(req.query.id, 10),
      name: req.query.name
    };
    pieRepo.search(searchObject, (data) => {
      res
        .status(200)
        .json({
          status: 200,
          statusText: 'OK',
          message: 'All pies retrieved.',
          data
        });
    }, (err) => {
      next(err);
    });
  });
router
  .get('/:id', (req, res, next) => {
    pieRepo.getById(req.params.id, (data) => {
      if (data) {
        res
          .status(200)
          .json({
            status: 200,
            statusText: 'OK',
            message: 'Single pie retrieved.',
            data
          });
      } else {
        res
          .status(404)
          .json({
            status: 404,
            statusText: 'Not Found',
            message: `The pie '${req.params.id}' could not be found.`,
            error: {
              code: 'NOT_FOUND',
              message: `The pie '${req.params.id}' could not be found.`
            }
          });
      }
    }, (err) => {
      next(err);
    });
  });

app.use('/api/', router);

app.server = app.listen(port, () => {
  debug(`Start time: ${new Date()}`);
  debug(`Listening on port: ${port}`);
});
