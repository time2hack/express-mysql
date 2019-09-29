const express = require('express');
const connection = require('../helpers/connection');
const query = require('../helpers/query');
const feedQuery = require('../query-builders/feed-query');
const tweetQuery = require('../query-builders/tweet-query');

const router = express.Router();
const dbConfig = require('../dbConfig');

router.get('/feed', async (req, res) => {
  const user = 1;
  const pivot = null;
  const conn = await connection(dbConfig).catch(e => {});
  const feed = await query(conn, feedQuery(user, pivot))
  res.send(feed);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const conn = await connection(dbConfig).catch(e => {});
  const tweet = await query(conn, tweetQuery(), [id])
  res.send(tweet[0]);
});

module.exports = router;
