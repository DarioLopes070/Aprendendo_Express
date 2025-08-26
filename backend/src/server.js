const app = require('./app');
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));