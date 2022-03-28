require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

//Creating DB connection and logging
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
mongoose.connection.on('error', (err) => console.log(err));
mongoose.connection.on('open', () => console.log('Connected to Database'));


//Middleware
app.use(cors());
app.use(express.json());

//Routes
const api = require('./routes/api');

app.use('/rest/balance', api);

//Creating server on port 3000.
app.listen(3014, () => console.log('Server Started'));
