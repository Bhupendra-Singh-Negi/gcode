import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import problemRoutes from './routes/problem.routes.js';
import executionRoute from './routes/executeCode.routes.js';
import submissionRoutes from './routes/submission.routes.js';
import playlistRoutes from './routes/playlist.routes.js';

dotenv.config();

const app=express();
// app.use(
//     cors({
//       origin: "http://localhost:5173",
//       credentials: true,
//     })
//   );
  app.use(
  cors({
    origin: function (origin, callback) {
      
      if (!origin) return callback(null, true);

      const allowedOrigins = [
        "http://localhost:5173",
        "http://localhost:3000",
        "https://www.codingshastra.codes",
        "https://codingshastra.codes",
        "https://coding-shastra.vercel.app",
       
      ];

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("CORS blocked origin:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cookie",
      "Set-Cookie",
      "Access-Control-Allow-Credentials",
    ],
    exposedHeaders: ["Set-Cookie"],
    
    optionsSuccessStatus: 200,
    preflightContinue: false,
  })
)
app.use(express.json());
app.use(cookieParser());
app.get('/', (req, res) => {
    res.send('Hello World welcom to GCode🔥!');
})

app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/problems",problemRoutes)
app.use("/api/v1/executeCode",executionRoute)
app.use("/api/v1/submission",submissionRoutes)
app.use("/api/v1/playlist",playlistRoutes)



app.listen(process.env.PORT,()=>{
    console.log("Server is running on port 8090");
})