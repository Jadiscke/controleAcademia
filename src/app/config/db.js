const { Pool } = require('pg');

module.exports = new Pool ({
  user: 'jadiscke',
  password: '1234',
  host: 'localhost',
  port: 5432,
  database: 'gymmanager',
})