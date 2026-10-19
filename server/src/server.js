
// require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

// const app = require('./app');
// const connectDatabase = require('./config/database');

// const port = Number(process.env.PORT) || 5000;

// connectDatabase();
// app.listen(port, () => console.info(`Portfolio API listening on port ${port}.`));


const path = require('path');

const envPath = path.resolve(__dirname, '../.env');
const result = require('dotenv').config({ path: envPath });

console.log('Env file path:', envPath);
console.log('Env file error:', result.error?.message || 'None');
console.log('MONGO_URI loaded:', Boolean(process.env.MONGO_URI));

const app = require('./app');
const connectDatabase = require('./config/database');

const port = Number(process.env.PORT) || 5000;

connectDatabase();
app.listen(port, () => console.info(`Portfolio API listening on port ${port}.`));
