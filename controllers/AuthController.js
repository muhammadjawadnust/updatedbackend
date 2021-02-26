//require('../dotenv').config();
const User = require('../models/User');
// const server  = require('../app.js');
const msg = require('../app.js'); // socket
const io = msg.socket_conn;


const socketConnection = require('../app.js');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
var spawn = require('child_process').spawn;

var exec = require('child_process').exec;
const fs = require('fs');

const bodyParser = require('body-parser');

var firebase = require('firebase');
var database = require('firebase/database');
const { parse } = require('@fortawesome/fontawesome-svg-core');
const { stderr, stdout } = require('process');
require('firebase/auth');




const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };

    //duplicate error code
    if (err.code === 11000){
        errors.email = 'that email is already registered';
        return errors;
    }
    //validate errors 
    if (err.message.includes('user validation failed')) {
        Object.values(err.values).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
        return errors;
    }
}


function firebaseConnection() {
    const firebaseConfig = {
        apiKey: "AIzaSyD_yBImzc5tWwfWfiCR0WWP3Bk0dQpUd2s",
        authDomain: "serial-data-node.firebaseapp.com",
        databaseURL: "https://serial-data-node-default-rtdb.firebaseio.com",
        projectId: "serial-data-node",
        storageBucket: "serial-data-node.appspot.com",
        messagingSenderId: "458814118167",
        appId: "1:458814118167:web:bc9b85b0fd230f83bd3f52",
        measurementId: "G-RNR5VJSD1S"
    };
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    else {
        firebase.app();
    }
 
};

const register = (req, res, next) => {
  
    bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
        if (err) {
            res.json({
                error: err
            })
        }


        let user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPass
        })
        firebaseConnection();
        firebase.database().ref('yain/').set({ "temp": "chal chor day" });

        user.save()
            .then(user => {
                res.json({
                    message: 'user added Successfully'
                })
            })
            .catch(error => {
                res.json({
                    message: 'An error occured'
                });
            })
    })

}
const login = (req, res, next) => {
    console.log("login is called");
    var username = req.body.username
    var password = req.body.password
    console.log(username);
    console.log(password);

    User.findOne({ $or: [{ email: username }, { phone: username }] }).then(user => {
        if (user) {
            bcrypt.compare(password, user.password, function (err, result) {
                if (err) {
                    console.log("error occured while finding user")
                    //    res.json({
                    //        error: err
                    //    }) 
                    //res.statusCode = 400;

                    //res.end();
                    //next();

                }
                if (result) {
                    try {
                        let token = jwt.sign({ name: user.name }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
                        var expiry = jwt.verify(token,  process.env.ACCESS_TOKEN_SECRET, (err, result) => { 
                            //return res.status(200).send({ err: err, result: result, }); 
                            if(err){
                               return err
                            }
                            else{
                               return result
                            }
                        });
                        //let {exp}= decode(token.expiresIn);

                        console.log(expiry);
                        res.json({
                            message: 'Login Successfully',
                            token: token,
                            expiry : expiry.exp
                        })

                        res.statusCode = 200;

                        res.end();
                        next();
                    }
                    catch (error) {
                        console.log("an error occured while comparing password and error is", error);
                        // res.statusCode = 404;
                        // res.end();
                        // next();
                    }
                } else {
                    res.json({
                        message: ' password doesnt matched!'

                    })
                    // res.sendFile('localhost:3000/compiler/src/login/loginpage.js');
                    // res.statusCode = 404;
                    // res.redirect('http://localhost:3000');
                    // res.end();
                    //next();
                }
            })
        } else {
            res.json({
                message: 'No user found'
            })
            res.end();
            next();
        }
    })
}
const getlogin = (req, res, next) => {
    //    if(req.body.name) { 
    res.status(200).json({
        message: 'I am called from getlogin'
    }
    );
    res.end();
    next();
    // return res.status(200).json({ message: "status 200 set" });

    //}
    // else{
    //     res.status(400).send({message:"status is set to 400"});
    //    // window.alert("i am called from getlogin");
    //    next();
    // }
}
const exec_trainer1_iot1 = (req, res, next) => {
    try {
        child_process.exec('../trainer1_iot1.bat', function (error, stdout, stderr) {
            //console.log(stdout);
            res.send(stdout)

            // stream.on('data', (data)=>{
            //     stream.pipe(JSONStream.stringify()).pipe(process.stdout
            // }
            //  stream.on('end', done)
        });


        // const anyData = await pool.connect((err, client, done) => {
        //     if (err) throw err;
        //     const query = new QueryStream(`SELECT"_reference180"."_description" AS person FROM "_reference180"  `)
        //     const stream = client.query(query)
        //release the client when the stream is finished

        // i can see my data in console

        //})
        // res.send(anyData); // THIS DONT SEND MY DATA, sorry;)
    } catch (e) {
        console.error(e.message);
    }

}
const get_firebase_app = (req, res, next) => {
    console.log("firebase is called");

    const firebaseConfig = {
        apiKey: "AIzaSyD_yBImzc5tWwfWfiCR0WWP3Bk0dQpUd2s",
        authDomain: "serial-data-node.firebaseapp.com",
        databaseURL: "https://serial-data-node-default-rtdb.firebaseio.com",
        projectId: "serial-data-node",
        storageBucket: "serial-data-node.appspot.com",
        messagingSenderId: "458814118167",
        appId: "1:458814118167:web:bc9b85b0fd230f83bd3f52",
        measurementId: "G-RNR5VJSD1S"
    };

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
        firebase.auth().signInWithEmailAndPassword("mjawad.nust@gmail.com", "123456")
            .then((user) => {
                console.log(user);
                res.send(user);
            }
            ).catch((e) => {
                console.log(e);
                res.send(e);
            }
            )


    }
    else {
        firebase.app(); // if already initialized, use that one
        // firebase.initializeApp(firebaseConfig);
        firebase.auth().signInInWithEmailAndPassword("mjawad.nust@gmail.com", "123456")
            .then((user) => {
                console.log(user);
                res.send(user);
            }
            ).catch((e) => {
                console.log(e);
                res.send(e);
            }
            )

    }
    /* <--------------------- Real data retrival code --------------------->
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
            var database = firebase.database();
            database.ref('/jawad').on("value", function (snap) {
                var temp_data = snap.val().temp;
                console.log(temp_data);
                res.send({"name":temp_data});
            });
    
        } else {
            firebase.app(); // if already initialized, use that one
            var database = firebase.database();
            database.ref('/jawad').on("value", function (snap) {
                var temp_data = snap.val().temp;
                console.log(temp_data);
               // temp_data= {"name":temp_data}
               // res.send({"name":temp_data});
            });
    
        }
        <--------------------- Real data retrival code ---------------------> */
    //res.end();
}
/* <--------------------------- Serial data Starts Here --------------------->>> */
const serialdata = (req, res, next) => {
    const port = req.body.port;
    const baudRate = req.body.baudrate;
    //const loop = req.body.loop;
    console.log(port, baudRate);

    res.send({
        "port": port,
        "baudrate": baudRate
    })
    const SerialPort = require('serialport');
    const Readline = SerialPort.parsers.Readline;
    const usbport = new SerialPort("COM" + port, { baudRate: baudRate });
    const parser = usbport.pipe(new Readline());

    try {
        parser.on('data', function (data) {
            //  io.emit('sensorValue', data);
            console.log(data);
            io.emit("sensorValue", data);
        });
        parse.on("end", function () {
            console.log("Port closed");
            io.emit("sensorValue", data);

        });
    }
    catch (e) {
        parser.on('error', function (error) {
            //         fs.writeFile('programming.txt', error, (err) => {
            //             if (err) {
            console.log("some erorr occured in parser");
            io.emit("sensorValue", data);
            //             }
            //         });
            //     });

        });

    }
}

/* <--------------------------- Serial data ENds Here --------------------->>> */
/* <--------------------------- Compile Starts Here --------------------->>> */
const compile = (req, res, next) => {

    // io.on("hello", (arg) => {
    //     console.log(arg); // world
    //   });
    //console.log(Rerserve_serve);
    let filename = req.body.filename; //this will be iot and trainer board name
    console.log(filename);
    switch (filename) {
        case ('trainer1_iot1'): {
            var ls = spawn('x.bat', ['adafruit:samd:adafruit_feather_m0', 'boards/surilli_basic', 'COM6']);
            console.log(filename);
        }
        case ('trainer1_iot2'): {
            var ls = spawn('x.bat', ['adafruit:samd:adafruit_feather_m0', 'boards/surilli_basic', 'COM6']);
        }
        case ('trainer1_iot3'): {
            var ls = spawn('x.bat', ['adafruit:samd:adafruit_feather_m0', 'boards/surilli_basic', 'COM6']);
        }
        case ('trainer1_iot4'): {
            var ls = spawn('x.bat', ['adafruit:samd:adafruit_feather_m0', 'boards/surilli_basic', 'COM6']);
        }
        case ('trainer1_iot5'): {
            var ls = spawn('x.bat', ['adafruit:samd:adafruit_feather_m0', 'boards/surilli_basic', 'COM6']);
        }
    }
    // var ls = spawn('C:/Users/DELL/Downloads/reactproject/Api/x.bat',['unbuffer'] );
    // var ls = spawn('ping',['127.0.0.1','-t']);

    //var ls = spawn('python.exe',["C:/Users/DELL/Downloads/reactproject/Api/controllers/x.py"],["-u"], { stdio: ['pipe', 'pipe','pipe']});

    // var ls = spawn('python.exe',["C:/Users/DELL/Downloads/reactproject/Api/controllers/x.py"],["-u"]);
    //var ls = exec('python -u C:/Users/DELL/Downloads/reactproject/Api/controllers/x.py');
    //console.log(ls);
    ls.stdout.on('data', function (data) {
        data = data.toString();

        io.emit("sensorValue", data);
        //res.send("done");
        // res.send(data);
        //    io.emit('sensorValue', data);
        //Rerserve_serve.emit('sensorValue', data);
        console.log("hello sensor data" + data);
        //console.log('stdout: ' + data.toString());
        // console.log(JSON.stringify({"serial-data":data}));
        //   io.on('sensorValue', data=>{
        //       console.log("getting sensor value"+ data);
        //   });
        //     firebaseConnection();
        //    firebase.database().ref('yain/').update({data});

    })

    ls.stderr.on('error', function (data) {
        // data = data.toString();
        io.emit('sensorValue', data);

        // io.emit('sensorValue', data);
        console.log("sensor data error " + data);
        //io.on('hello', (data)=> console.log(data));
        console.log('stderr: ' + error.toString());
        // res.send(data);
        // res.write(error);
        // flush(stderr);
        // res.end();
    });

    ls.on('exit', function (code) {
        data = code.toString();
        io.emit('sensorValue', code);
        console.log(' ls exited  code ' + code.toString());

    })
    res.end();
}

const compile1 = (req, res, next) => {
    // res.send({
    //     "output":"the output is compile1"
    // })
    // res.end();
    console.log("heelow");
}
module.exports = {
    register, login, getlogin, exec_trainer1_iot1, get_firebase_app, serialdata, compile, compile1
}
