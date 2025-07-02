import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';

import userRoutes from './routes/users.routes.js';
import { connectToSocket } from './controllers/socketManager.js';





const app = express();
const server = createServer(app);
const io = connectToSocket(server);





app.set("port",(process.env.PORT || 8000));

app.use(cors());
app.use(express.json({limit: '40kb'}));
app.use(express.urlencoded({limit: '40kb',extended: true}));

  app.use("/api/v1/users", userRoutes);


const start = async () => {
app.set("mongo_user") 
try{
    const connectionDb = await mongoose.connect("mongodb+srv://devvarth6565:devvarth6565VideoCall@videocall.sdoxapz.mongodb.net/?retryWrites=true&w=majority&appName=VideoCall")
    console.log("MongoDB connected successfully");

    server.listen(8000, () => {
        console.log("Server is running on port 8000");
    }
    );
    }catch(err){
        console.error("MongoDB connection failed", err);
    };
     
    
}
start();