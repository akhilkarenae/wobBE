import express from 'express';
import passport from 'passport';
import cors from 'cors'
import dotenv from 'dotenv'

import { dbConnection } from './db/connection.js';
import routes from './routes/index.js'
import { initializingJwtStrategy } from './utils/passportConfig.utils.js';



dotenv.config();

const app = express();

const corsOptions = {
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

dbConnection()

app.use(express.json())
initializingJwtStrategy(passport);
app.use(passport.initialize());

app.use(cors(corsOptions))

app.use('/api',routes)

app.use((err, req, res, next) => {
    const errStatus = err.status || 500;
    const errMsg = err?.message || "some Internal error";
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg
    })
})


app.listen(process.env.PORT, () =>{
    console.log(`Product server listening on port ${process.env.PORT}`)
})