import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import cors from "cors";
import { config } from "./config.js";


const app = express();
const port = 3001;

app.use(cors());

const databaseConfig = new config;
//console.log(databaseConfig.DB_DATABASE);

const db = new pg.Client({

    user: databaseConfig.DB_USER,
    host: databaseConfig.DB_HOST,
    database: databaseConfig.DB_DATABASE,
    password: databaseConfig.DB_PASSWORD,
    port: databaseConfig.DB_PORT,
});

db.connect();

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("public"));

app.get('/api/data', async (req, res) => {

    try {
        const result = await db.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (error) {

        console.error("Error executing query", error);
        res.status(500).json({
            error: "Internal server error"
        });
    }
});

app.get('/api/verifyUser', async (req, res) => {

    const userName = req.query.user_name;
    //console.log(userName);

    try {
        const result = await db.query("SELECT user_password FROM users WHERE user_name=$1;", [userName]);
        res.json(result.rows);
    } catch (error) {

        console.error("Error executing query", error);
        res.status(500).json({
            error: "Internal server error"
        });
    }
});

app.post('api/registerUser', async (req, res) => {

    const newUserName = req.query.user_name;
    const newUserMail = req.query.user_email;
    const newUserPassword = req.query.user_password;

    try {
        await db.query("INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3)",
            [newUserName, newUserMail, newUserPassword]);
    } catch (error) {

        console.error("Error executing query", error);
        res.status(500).json({
            error: "Internal sever error"
        });
    }
});



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});