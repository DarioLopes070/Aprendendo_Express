const mysql = require('mysql2/promise');
require('dotenv').config();
// Create a connection pool to the MySQL database
// Ensure you have the correct environment variables set in your .env file
const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,  
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB, 
});

// Export the connection pool for use in other modules
module.exports = connection; 