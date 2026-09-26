import express from "express";
import cors from "cors";
import authRoutes from "./routes/authroutes.js";
import passport from "passport";
import workflowRoutes from "./routes/workflowRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import connectDB from "./config/db.js";
const app = express();
await connectDB();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);



app.use(express.json());


// Initialize passport

app.use(passport.initialize());



app.use(
"/api/auth",
authRoutes
);

app.use(
  "/api/settings",
  settingsRoutes
);

app.use("/api/workflows", workflowRoutes);

app.get("/",(req,res)=>{

res.send(
"MiniZap Backend Running 🚀"
);

});



export default app;