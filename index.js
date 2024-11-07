import express from  "express";
import dotenv from  "dotenv";
import {connectDb} from "./database/db.js";
import cors from 'cors';
import Razorpay from 'razorpay';




dotenv.config();
export const instance=new Razorpay({
    key_id:process.env.Razorpay_Key,
    key_secret:process.env.Razorpay_Secret,

});
const app=express();
//using middlewares
app.use(express.json());

app.use(cors({
  origin: 'https://e-learningserver-production.up.railway.app', // Frontend URL
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));



const port = process.env.PORT;

app.get("/",(req,res)=>{
    res.send("SERVER IS WORKING");
});
app.use('/uploads', cors(), express.static('uploads'));




//IMPORTING ROUTES
import userRoutes from './routes/user.js';
import courseRoutes from './routes/course.js';
import adminRoutes from './routes/admin.js';
//USING API 
app.use('/api',userRoutes);
app.use('/api',courseRoutes);
app.use('/api',adminRoutes);
app.listen(port,()=> {
    console.log(`server is running on port http://localhost:${port}`);
    connectDb();
});
