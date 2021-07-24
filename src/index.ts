import app from './app'
import { connectDB } from './libs/database'
import { Server } from 'http'
import SocketIO from 'socket.io'
import dotenv from 'dotenv'
// import Socket from './libs/socket'
import Cron from './libs/cronjob'
import * as express from 'express';
const path = require("path");

dotenv.config()

async function main(): Promise<Server> {

    let { ENV } = process.env;
    if(!ENV) {
        console.error("No ENV variable found.");
        process.exit();
    } else if (!["prod", "dev"].includes(ENV)){
        console.error("Incorrect ENV variable. Choose either prod or dev");
        process.exit();
    } else {
        let mode = ENV == "dev" ? "development" : "production";
        console.info(`Mode: ${mode}`);
    }

    await connectDB()

    Cron()
    // app.use("/uploads", express.static(path.join(__dirname, '..', "uploads")));
    
    let server = app.listen(app.get('port') ,()=> {
        console.log(`server on port ${app.get('port')}`);
    })

    return server
}

main().then((server: Server) => {
   
})