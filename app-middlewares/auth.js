const express = require('express');
const connection = require('../helpers/connection');
const query = require('../helpers/query');

const router = express.Router();
const dbConfig = require('../dbConfig');

const create = require('../crud/create');

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const conn = await connection(dbConfig).catch(e => {});
  const result = await create(
    conn,
    'USERS',
    ['username', 'password'],
    [username, { toString: () => `MD5('${password}')`}]
  );

  const [user = {}] = result;
  res.send({
    id: user.id || null,
    username: user.username || null,
  });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const conn = await connection(dbConfig).catch(e => {});
  const user = await query(
    conn,
    `SELECT id, username FROM USERS WHERE username=? AND password=MD5(?)`,
    [username, password]
  );
  res.send(user[0] || { id: null, username: null });
});

module.exports = router;
