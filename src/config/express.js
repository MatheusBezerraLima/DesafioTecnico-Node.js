const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(express.urlencoded( {extended: true} ));
app.use(express.static(path.resolve(__dirname, "../data")));
app.use(cors());


const config = () => {
    console.log(__dirname);
    return app;
} 

module.exports = config;


