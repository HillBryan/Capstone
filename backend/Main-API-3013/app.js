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
const submissionRoute = require('./routes/submission');
const testCaseRoute = require('./routes/testcase');
const problemRoute = require('./routes/problem');
const classRoute = require('./routes/class');

app.use('/rest/submission', submissionRoute);
app.use('/rest/testcase', testCaseRoute);
app.use('/rest/problem', problemRoute);
app.use('/rest/class', classRoute);

//Creating server on port 3000.
app.listen(3013, () => console.log('Server Started'));
