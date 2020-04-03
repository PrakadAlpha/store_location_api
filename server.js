const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path')
const stores = require('./routes/stores')
const connectDb = require('./config/db');

dotenv.config({path: "./config/config.env"});

connectDb();

const app = express();

app.use(express.json());

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', stores);

const PORT = process.env.PORT || 3000

app.listen(PORT, _ => console.log(`Server running in port ${PORT} on ${process.env.NODE_ENV} mode..`));
