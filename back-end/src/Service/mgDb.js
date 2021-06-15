const mongoose = require("mongoose");

const connectionString1 =
  "mongodb+srv://lc_user:lc_password@cluster0.0uwty.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectionString =
  "mongodb+srv://Hemant:ASHish$$123@cluster0.h4fve.mongodb.net/LetsConnect?retryWrites=true&w=majority";

const getDBClient = async () => {
  const client = await mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return client;
};

module.exports = {
  getDBClient: getDBClient,
};
