const mongoose = require('mongoose');
const URI = process.env.MONGODB_URL;

mongoose
  .connect(`${URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connection successful");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

module.exports = mongoose;