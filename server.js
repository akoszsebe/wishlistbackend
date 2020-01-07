const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { Pool, Client } = require('pg');
const dbConfig = require('./config/database.config.js');
const Db = require('./database/db');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || dbConfig.urlLocalDatabase
})

const database = new Db(pool);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Access-Control-Allow-Credentials', 'true');
    next()
});

database.create((resp) => {
    if (resp) {
            const server = app.listen(process.env.PORT || 8080, function () {
            const port = server.address().port;
            console.log("Database tables generated: ", resp);
            console.log("App now running on port", port);
        });
    }
})


require('./routes/routes.js')(app, pool,database);