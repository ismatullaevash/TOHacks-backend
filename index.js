import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import FarmsDAO from "./dao/farmsDAO.js"
import UserDAO from "./dao/usersDAO.js"
import BookingDAO from "./dao/bookingDAO.js";
dotenv.config();
const mongoClient=mongodb.MongoClient;
const port=process.env.PORT||8000;
mongoClient.connect(process.env.RESTAURANT_REVIEWS_DB_URI,
    {
        poolSize:50,
        wtimeout:2500,
        useNewUrlParser:true,
        useUnifiedTopology: true
    }
    )
    .catch(err=>{
        console.error(err.stack);
        process.exit(1);
    })
    .then(async client=>{
        await FarmsDAO.injectDB(client);
        await UserDAO.injectDB(client);
        await BookingDAO.injectDB(client);
        app.listen(port,()=>{
            console.log('listening on port '+port);
        })
        
    });