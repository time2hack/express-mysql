const dotenv = require("dotenv")
 
dotenv.config();

// Get the Host from Environment or use default
const host = process.env.DB_HOST;

// Get the User for DB from Environment or use default
const user = process.env.DB_USER;

// Get the Password for DB from Environment or use default
const password = process.env.DB_PASS;

// Get the Database from Environment or use default
const database = process.env.DB_DATABASE;

if(!host || !user || !password || !database) {
  console.error('Needed credentials not found! Please create .env file from .env.example and fill the values');
  process.exit(1);
}

module.exports = { host, user, password, database };
