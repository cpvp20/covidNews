const express = require('express');
const fetch = require("node-fetch"); //Dado que la función fetch no existe en Node, es posible, instalar la librería node-fetch para agregar esta funcionalidad 
var cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 8080;
const app = express();
app.use(cors());
const apiUrl = process.env.API_URL;
const apiKey = process.env.API_KEY;

app.get('/', function (req, res) {
    res.end('Hello there from covid news service!');
});

//Returns covid-related news
app.get('/news', (req, res) => {
    const url = `${apiUrl}apiKey=${apiKey}&q=covid`;
    fetch(url)
        .then((response) => {
            if (response.status == 200) {
                return response.text();
            } else {
                return "error when fetching from API, status was not 200";
            }
        })
        .then((response) => {
            res.status(200).end(response);
        })
        .catch((err) => {
            res.status(err.status).end(err.message);
        });
});

app.listen(port, () => {
    console.log(`Backend Server covid info running on port ${port}`);
});