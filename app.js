
var createError = require('http-errors');
var bodyParser = require('body-parser');
var express = require('express');
const os = require("os")
const cluster = require("cluster")

const PORT = process.env.PORT || 5000






var app = express();

var http = require('http').createServer();


var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
var cors = require('cors');


//Passport Config
require('./config/passport')(passport);

//DB Config
const db = require('./config/keys').mongoURI;

//Connect to MongoDB
function connect_db(){
mongoose
  .connect(
    db,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

  }
//app.use(bodyparser());
// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const server = app.listen('5000', (err) => {
  if (err) {
    console.log("An error occured while turning on Node server");
  }
  else {
    console.log("Node server running on Port 5000");
    connect_db();
  }
});


// const clusterWorkerSize = os.cpus().length
// if (clusterWorkerSize > 1) {
//   if (cluster.isMaster) {
//     for (let i=0; i < clusterWorkerSize; i++) {
//       cluster.fork()
//     }

//     cluster.on("exit", function(worker) {
//       console.log("Worker", worker.id, " has exitted.")
//     })
//   } 
//   else {
//     const app = express()

//   const server =   app.listen(PORT, function () {
//       console.log(`Express server listening on port ${PORT} and worker ${process.pid}`)
//     })
//     intialize_sockets(server);
//     connect_db();
//   }
// }
//  else {
//   const app = express()

//   const server =  app.listen(PORT, function () {
//     console.log(`Express server listening on port ${PORT} with the single worker ${process.pid}`)
//   })
//   intialize_sockets(server);
//   connect_db();
// }



function intialize_sockets(server){
const io = require('socket.io')((server),{
  cors: {
      // origin: "http://localhost:3000",
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true
  }
  //  maxHttpBufferSize: 1e2
  
});


const socket_conn= io.on('connection', (socket) => {
  console.log(socket.id);
  console.log("connection established");
  module.exports = { socket} ;
  
});

module.exports.socket_conn = socket_conn;

}
intialize_sockets(server);

// = {
//   firstname: "jawad",
//   lastname: "heleo"
// }

const AuthRoute = require('./routes/auth')

app.use('/api', AuthRoute)

