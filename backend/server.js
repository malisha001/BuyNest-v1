const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()

//import routes
const userRoute = require('./routers/userRoute')
const productRoute = require('./routers/productRoute')

// express app
const app = express();

// middleware to parse incoming JSON data
app.use(express.json());

//routes
app.use('/api/user',userRoute)
app.use('/api/product',productRoute)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log("Listening on port", process.env.PORT);
            console.log("DB connected successfully");
        });
    })
    .catch((error) => {
        console.log(error);

    });

