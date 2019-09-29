const express = require('express');
const connection = require('../helpers/connection');
const query = require('../helpers/query');

const router = express.Router();
const dbConfig = require('../dbConfig');

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const conn = await connection(dbConfig).catch(e => {});
  const user = await query(
    conn,
    `INSERT INTO USERS(username, password) VALUE(?, MD5(?));`,
    [username, password]
  );
  if (user.insertId) {
    res.send(await query(conn, `SELECT id, username FROM USERS WHERE ID=?`, [user.insertId]))
    return;
  }
  res.send({ id: null, username: null });
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
