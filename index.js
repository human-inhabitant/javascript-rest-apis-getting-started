const debug = require('debug')('app');
const express = require('express');
const bodyParser = require('body-parser');
const pieRepo = require('./repos/pieRepo');
const errorHelper = require('./helpers/errorHelpers');

const app = express();
const router = express.Router();
const port = process.env.PORT || 3e3;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
router
  .post('/', (req, res, next) => {
    pieRepo.insert(req.body, (data) => {
      res
        .status(201)
        .json({
          status: 201,
          statusText: 'Created',
          message: 'New pie added.',
          data
        });
    }, (err) => {
      next(err);
    });
  });
router
  .put('/:id', (req, res, next) => {
    pieRepo.getById(req.params.id, (data) => {
      if (data) {
        // eslint-disable-next-line no-shadow
        pieRepo.update(req.body, req.params.id, (data) => {
          res.status(200).json({
            status: 200,
            statusText: 'OK',
            message: `Pie '${req.params.id}' updated.`,
            data
          });
        });
      } else {
        res.status(404).send({
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
router
  .delete('/:id', (req, res, next) => {
    pieRepo.getById(req.params.id, (data) => {
      if (data) {
        // eslint-disable-next-line no-shadow
        pieRepo.delete(req.params.id, (data) => {
          res.status(200).json({
            status: 200,
            statusText: 'OK',
            message: `The pie '${req.params.id}' is deleted.`,
            data: `Pie '${req.params.id}' deleted.`
          });
        });
      } else {
        res.status(404).send({
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
router.patch('/:id', (req, res, next) => {
  pieRepo.getById(req.params.id, (data) => {
    if (data) {
      // eslint-disable-next-line no-shadow
      pieRepo.update(req.body, req.params.id, (data) => {
        res.status(200).json({
          status: 200,
          statusText: 'OK',
          message: `Pie '${req.params.id}' patched.`,
          data
        });
      });
    } else {
      res.status(404).send({
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

app.use(errorHelper.logErrors);
app.use(errorHelper.clientErrorHandler);
app.use(errorHelper.errorHandler);

app.server = app.listen(port, () => {
  debug(`Start time: ${new Date()}`);
  debug(`Listening on port: ${port}`);
});
