import mongoose from 'mongoose'


export const connectMongoDatabase = async() => {
    try{
         const conn  = await mongoose.connect(process.env.DB_URL);
         console.log(`Monogo DB Connect to Server : ${conn.connection.host}`)

    }catch(err){
         console.log(`Error Connection to database : ${err.message}`);
         process.exit(1)
    }
 }