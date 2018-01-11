var express = require('express');
var moment = require("moment");
var app = express();

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/:time", function (req, res) {
  var date;
  if(/^\d{8,}$/.test(req.params.time)) {
    date = moment(req.params.time, "X");
  } else {
    date = moment(req.params.time, "MMMM D, YYYY");
  }
  if (date.isValid()){
    var result = {
      unix : Number(date.format("X")),
      natural : date.format("MMMM D, YYYY")
    }
    res.json(result)
  } else {
    var result = {
      unix : null,
      natural : null
    }
    res.json(result)
  }
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

