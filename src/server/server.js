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



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});