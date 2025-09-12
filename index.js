import express from "express";
import dotenv from "dotenv"
import db from "./utils/db.js"
import cors from "cors"
import cookieParser from "cookie-parser";
//import all routes
import userRoutes from "./routes/user.routes.js"

const app = express();

app.use(cors({
    origin:process.env.BASE_URL,
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,
    allowedHeaders:["Content-Type","Authorization"]
}

));
app.use(cookieParser());
app.use(express.json())

app.use(express.urlencoded({extended:true}));

dotenv.config();
const port =process.env.PORT||3000;

app.get('/', (req, res) => res.send('Hello World!'))

db();
app.use("/api/v1/users",userRoutes)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))