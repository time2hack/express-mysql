module.exports = (user, pivot) => `
SELECT id, username, tweet, timestamp
FROM tweets WHERE ( user_id = ${user}
  OR ( user_id IN (
    SELECT user2_id FROM following WHERE user1_id = ${user}
  ) )
) ${pivot ? `AND id < ${pivot}` : ''}
ORDER BY id DESC
LIMIT 0, 50`;
