require("dotenv").config();
require("./config/db");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser')
const app = express();
const helmet = require("helmet");
const routes = require('./routes')
const morgan = require('morgan');


app.use(morgan('combined'));



app.use(express.json()); 
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(helmet());
app.get("/", (req, res) => { 
    res.json({
        status: 200,
        message: "Welcome to Our API 🚀🚀 !"
    });
});


/*
const allowedOrigins = [
    'https://examble.com',
  ];
  
  const corsOptions = {
    origin: function (origin, callback) {
      // Check if the origin is allowed or if it is undefined (e.g., when making requests from a file:// URL)
      if (allowedOrigins.includes(origin) ) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  app.use(cors(corsOptions));
*/

app.use(cors({
  origin: '*'
}));

app.use('/api', routes)
app.all("*", (req, res) => { 
    res.status(404).json({
        status: 404,
        message: "404 | This endpoint not found"
    });
});
const PORT = process.env.PORT || 5000;
module.exports = app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});
