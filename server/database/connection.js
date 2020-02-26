const config = require("./default");
const uri = config.ConnectionUrl;
const { MongoClient } = require("mongodb");
const client = new MongoClient(uri, { useNewUrlParser: true });

const connectDatabase = async () => {
  try {
    await client.connect();
    console.log("MongoDB is Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
connectDatabase();
module.exports = client;
