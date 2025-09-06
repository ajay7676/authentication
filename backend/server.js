import app from './app.js'
import dotenv from 'dotenv'

dotenv.config({path: "config/config.env"});
import {connectMongoDatabase} from './config/db.js'

 const port = process.env.PORT || 5000;
app.listen( port, () =>{
          connectMongoDatabase();

     console.log(`Server is runnig on port number ${port}`);
})