import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import passport from "passport";


const app = express();


app.use(
cors({
origin:"http://localhost:5173",
credentials:true
})
);



app.use(express.json());


// Initialize passport

app.use(passport.initialize());



app.use(
"/api/auth",
authRoutes
);



app.get("/",(req,res)=>{

res.send(
"MiniZap Backend Running 🚀"
);

});



export default app;