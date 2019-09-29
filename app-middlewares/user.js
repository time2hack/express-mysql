const express = require('express');
const connection = require('../helpers/connection');
const query = require('../helpers/query');

const router = express.Router();
const dbConfig = require('../dbConfig');

// GET
// /user
router.get('/', async (req, res) => {
  const user = 1;
  const conn = await connection(dbConfig).catch(e => {});
  const currentUser = await query(conn, `SELECT * FROM USERS
    WHERE id = ?`, [user])
  res.send(currentUser[0]);
});

// GET
// /user/followers
router.get('/followers', async (req, res) => {
  const user = 1;
  const conn = await connection(dbConfig).catch(e => {});
  const followers = await query(conn, `SELECT
    USER_INFO.*, username as user1_username
    FROM (SELECT 
    user1_id, user2_id, username as user2_username
    FROM FOLLOWING LEFT JOIN USERS ON user2_id = users.id
    WHERE user1_id = ?) as USER_INFO
    LEFT JOIN USERS ON user1_id = users.id`, [user])
  res.send(followers);
});

// GET
// /user/following
router.get('/following', async (req, res) => {
  const user = 1;
  const conn = await connection(dbConfig).catch(e => {});
  const followers = await query(conn, `SELECT
    USER_INFO.*, username as user1_username
    FROM (SELECT 
    user1_id, user2_id, username as user2_username
    FROM FOLLOWING LEFT JOIN USERS ON user2_id = users.id
    WHERE user2_id = ?) as USER_INFO
    LEFT JOIN USERS ON user1_id = users.id`, [user])
  res.send(followers);
});

// POST
// /user/following
router.post('/following', async (req, res) => {
  const user = 1;
  const { id } = req.params;
  const conn = await connection(dbConfig).catch(e => {});
  const follow = await query(conn, `INSERT INTO FOLLOWING
    (user1_id, user2_id)
    VALUE (?, ?)`, [user, id])
  res.send(follow);
});
// GET
// /user/settings 
router.get('/settings', async (req, res) => {
  const user = 1;
  const conn = await connection(dbConfig).catch(e => {});
  const settings = await query(conn, `SELECT * FROM SETTINGS WHERE user_id = ?`, [user])
  res.send(settings);
});

// PUT
// /user/settings 
router.put('/settings', async (req, res) => {
  const user = 1;
  const vals = req.body;
	const values = Object.keys(vals).map(k => `${k}=${vals[k]}`);
  const conn = await connection(dbConfig).catch(e => {});
  const status = await query(conn, `UPDATE SETTINGS
		SET ? WHERE user_id = ?`, [values, user])
  res.send(status);
});

module.exports = router;
