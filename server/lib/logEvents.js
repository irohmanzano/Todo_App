const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const logEvents = async (msg, filename) => {
  const date = format(new Date(), 'yyyyMMdd\tHH:mm:ss');
  const logItem = `${date}\t${uuid()}\t${msg}\n`;

  if(!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
    await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
  }

  fs.appendFile(path.join(__dirname, '..', 'logs', filename), logItem, (err) => {
    if(err) console.log(err);
  });
};

const logServerEvents = async (req, res, next) => {
  logEvents(`${req.method}\t${req.url} ${req.headers.origin}`, 'serverLogs.txt');
  next();
};

module.exports = { logEvents, logServerEvents };
