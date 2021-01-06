const express = require('express');
const path = require('path');
const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const app = express();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

// --------- get publicDirectory ---------
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory))

// --------- Parsing URL-encoded bodies (as sent by html forms) --------- 
app.use(express.urlencoded({ extended: false }));
// --------- Parse JSON bodies (as sent API clients)
app.use(express.json());

app.set('view engine', 'hbs');

db.connect((err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("MYSQL Connected ...")
    }
})

// --------- Definne Routes ----------
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'))

app.listen(5000, () => {
    console.log("Server started on Port 5000");
});