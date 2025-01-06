require('dotenv').config();

const path = require('path');

const { logServerEvents } = require('./lib/logEvents');
const dbConn = require('./config/dbConn');

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3500;

dbConn();

const app = express();

app.use(require('./middleware/credentials'));

app.use(cors(require('./config/corsOptions')));

app.use(logServerEvents);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());

app.use('/register', require('./router/register'));
app.use('/auth', require('./router/auth'));
app.use('/refresh', require('./router/refresh'));
app.use('/logout', require('./router/logout'));

app.use(require('./middleware/verifyJWT'));

app.use('/todos', require('./router/todos'));

app.use(require('./lib/logErrors'));

mongoose.connection.once('open', () => {
  console.log('CONNECTED TO DATABASE');
  app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT ${PORT}`);
  });
});