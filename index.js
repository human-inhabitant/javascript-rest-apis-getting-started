const debug = require('debug')('app');
const express = require('express');

const app = express();
const router = express.Router();
const port = process.env.PORT || 3e3;

router
  .get('/', (req, res, next) => {
    res.send('Apple');
  });

app.use('/api/', router);

app.server = app.listen(port, () => {
  debug(`Start time: ${new Date()}`);
  debug(`Listening on port: ${port}`);
});
