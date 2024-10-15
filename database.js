const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoURI = "mongodb+srv://zakarian17s:amYtY3JMqPRvjB7E@cluster0.uorea.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

// amYtY3JMqPRvjB7E

const connectToMongo = async () => {
  mongoose.set('debug', true);  //enable debug mode
  const con = await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
  });
  console.log(
    `Connected to DataBase ${con.connection.name} : ${con.connection.host}`
  );
};

module.exports = connectToMongo;