const express = require('express'); 
const app=express(); 
const cors = require('cors');


const callServer = (dbo) => {

  app.use(cors({
    origin: '*'
  })); 
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  app.post('/destinations/insertOne', (req, res) => {
    dbo.collection("destinations").insertOne(req.body, function(err, response) {
      if (err) throw err;
      res.end(JSON.stringify(response));
    });
  });

  app.post('/tefs/insertOne', (req, res) => {
    dbo.collection("tefs").insertOne(req.body, function(err, response) {
      if (err) throw err;
      res.end(JSON.stringify(response));
    });
  });

  app.get('/tefs/getAll', function (req, res) {
    dbo.collection("tefs")
    .find({})
    .toArray(function(err, response) {
          res.send(JSON.stringify(response));
        });
  })

  app.get('/destinations/getAll', function (req, res) { 
    dbo.collection("destinations")
        .find({})
        .toArray(function(err, response) {
              res.end(JSON.stringify(response));
            });
  })

  app.get('/users/getOne', function (req, res) { 
    const rut = req.query.rut;
    dbo.collection("users")
              .find({rut: rut})
              .toArray(function(err, response) {
                    (!response[0])
                    ?
                      res.end(JSON.stringify(null))
                    :
                      res.end(JSON.stringify(response[0]));
                  });
  })

  app.listen(
    8080, 
    () => console.log(`Server listening on port 3000.`));

}
exports.callServer =  callServer;