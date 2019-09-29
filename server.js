const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./dbConfig');
// ↑ exports = {user, password, host, databse}
const tweetsRouter = require('./app-middlewares/tweets');
const userRouter = require('./app-middlewares/user');
const authRouter = require('./app-middlewares/auth');

const app = express();
const port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

const connection = require('./helpers/connection');
const query = require('./helpers/query');

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/list', async (req, res) => {
  const conn = await connection(dbConfig).catch(e => {});
  const results = await query(conn, 'SELECT * FROM tweets').catch(console.log);
  res.json({ results });
})

app.use('/tweets', tweetsRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
