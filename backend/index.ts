import dotenv from 'dotenv';
dotenv.config();
import path from "path";
import express from 'express';
import cors from "cors";
import { dbConnect } from "./src/config/dbconnect.config";

const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: ['http://localhost:4200']
}))

app.use(express.static('public'));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const port = 5000;
app.listen(port, ()=>{
    console.log('server is running on port : '+port);
})