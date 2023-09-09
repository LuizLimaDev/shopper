require('dotenv').config()
const express = require('express');
const app = express();
const routes = require('./routes/routes');
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.use(routes);

const port = process.env.PORT || 3030
app.listen(port);