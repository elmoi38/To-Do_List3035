var express = require("express");
var app = express();
var mongojs = require("mongojs");
var db = mongojs('itemlist',['itemlist']);
var bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

app.get('/itemlist', function(req, res){
	console.log("I received a GET request");

	db.itemlist.find(function(err, docs){
		console.log(docs);
		res.json(docs);

	});

});

app.post("/itemlist", function(req, res){
	console.log(req.body);
	db.itemlist.save(req.body, function(err, docs){
		res.json(docs);
	});

});

app.delete('/itemlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.itemlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/itemlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.itemlist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
     res.json(doc);
  });
});

app.put('/itemlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.itemlist.findAndModify(
   { query: {_id: mongojs.ObjectId(id)}, 
     update: {$set: {title: req.body.title, text: req.body.text, due: req.body.due}},
     new: true 
   }, function(err, doc){
     res.json(doc);
   });
});


app.put('/itemlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.itemlist.findAndModify(
   { query: {_id: mongojs.ObjectId(id)}, 
     update: {$set: {status: "completed"}},
     new: true 
   }, function(err, doc){
     res.json(doc);
   });
});

app.listen(3000);

console.log("Server running on port 3000");


