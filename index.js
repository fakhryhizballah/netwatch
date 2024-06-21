"use strict";
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const morgantyp = process.env.MORGAN_TYPE || 'dev';
app.use(express.json());
app.use(morgan(morgantyp));

const routes = require('./routes');
app.use('/api/netwatch', routes);

app.use((req, res, next) => {
    return res.status(404).json({
        message: "not found",
        error: null
    });
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('running on port', PORT);
});