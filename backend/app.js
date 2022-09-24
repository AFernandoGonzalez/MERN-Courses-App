const express = require('express');
const cors = require('cors');
const bodyParser= require('body-parser');
require('dotenv').config();

// routes
const routerCourses = require('./routes/courses.routes.js')

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/courses', routerCourses)

app.listen(process.env.PORT || 8000, () => {
    console.log(`Server listening in port ${process.env.PORT}`)
})