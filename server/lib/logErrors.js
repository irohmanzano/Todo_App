const { logEvents } = require('./logEvents');

const logErrors = (err, req, res, next) => {
  if(err) {
    logEvents(`${req.url}\t${err.name} ${err.message}`, 'errLogs.txt');
  }
  res.send(`${err.name} ${err.message}`);
};

module.exports = logErrors;