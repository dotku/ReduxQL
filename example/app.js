var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var dispatchRouter = require("./routes/dispatch");
var usersRouter = require("./routes/users");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/dispatch", dispatchRouter);
app.use("/users", usersRouter);

var listener = app.listen(8080, function (err) {
  if (err) console.log(err);
  console.log("Listening on port " + listener.address().port);
});
