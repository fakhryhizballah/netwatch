"use strict";
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path');
const morgantyp = process.env.MORGAN_TYPE || 'dev';
app.use(express.json());
app.use(morgan(morgantyp));

const routes = require('./routes');
app.use('/api/netwatch', routes);


app.set('view engine', 'ejs');

// app.use(favicon(path.join(__dirname + '/public/', 'favicon.ico')));
app.use("/asset/js/", express.static(path.join(__dirname + '/public/js/')));
app.use("/asset/img/", express.static(path.join(__dirname + '/public/img/')));
app.use("/asset/css/", express.static(path.join(__dirname + '/public/css/')));
app.use("/asset/", express.static(path.join(__dirname + '/public/')));

// app.use((req, res, next) => {
//     return res.status(404).json({
//         message: "not found",
//         error: null
//     });
// })
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('running on port', PORT);
});