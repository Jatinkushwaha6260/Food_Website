import express from "express"
import dotenv from "dotenv"
dotenv.config();
import User from "./models/userModel.js"
import connectDB from "./config/db.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import authRouter from "./routes/authRoute.js"

//DB Connected
 connectDB();
const app = express();

const port = process.env.PORT || 5000

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))


app.get("/",(req,res) => {
    return res.json("what is your name");
})

//routes
app.use("/api",authRouter)




app.listen(port , () => {

   console.log(`server started at ${port}`);

})

