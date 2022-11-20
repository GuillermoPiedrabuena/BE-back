const MongoClient = require('mongodb').MongoClient;
const api = require('./api')
require('dotenv').config();

const url = `mongodb+srv://${process.env.DB}:${process.env.DB_PASSWORD}@${process.env.DB_USER}.mzls4es.mongodb.net/?retryWrites=true&w=majority`;
MongoClient.connect(url, function(err, db) {
  try{
    var dbo = db.db(process.env.DB);
} catch(err){
    console.log('DB already exist!', err)
}
  try{
    dbo.createCollection("tefs", function(err, res) {
        console.log("Collection created!");
      });
  } catch(err){
      console.log('Collection tef already exist!', err)
  }
  try{
    dbo.createCollection("users", function(err, res) {
        console.log("Collection created!");
      });
  } catch(err){
    console.log("Collection users already exist!", err);

  }
  try{
    dbo.createCollection("destinations", function(err, res) {
        console.log("Collection created!");
    });
  } catch(err){
    console.log("Collection destinations already exist!", err);
  }
  api.callServer(dbo);
});


