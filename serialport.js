const fs = require('fs');
var socket = require('socket.io');




//adding serial libraries 
const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
const usbport = new SerialPort('COM7', { baudRate: 115200 });
const parser = usbport.pipe(new Readline());

try {
    parser.on('data', function (data) {
       // console.log(data);
        //io.sockets.emit('launch', data);
        fs.writeFile('programming.txt', data, function (err) {
            if (err) {
                console.log("error saving file");
            }
        });
      //  console.log("parser data is saving into file");
    });
}
catch (e) {
    parser.on('error', function (error) {
        fs.writeFile('programming.txt', error, (err) => {
            if (err) {
                console.log("some erorr occured in parser");
            }
        });
    });

}


//static files
app.use(express.static('public'));

//socket setup
var io = socket(server);

io.on('connection', function (socket) {
    console.log('made socket connection', socket.id);

    socket.on('chat', function (data) {
        io.sockets.emit('chat', data);//this condition is to emit data that is recived from the client to rest of the connected connections
    });


    socket.on('launch', function (data) {
        console.log("socket launc event is triggerd");
        var tempsize = fs.statSync('programming.txt');
        var actualsize = tempsize.size;
        //console.log(actualsize);
        //io.sockets.emit('launch', data);
        //while (true) {
        // var data = fs.readFileSync('programming.txt', 'utf8', function (err) {
        //     if (err) {
        //         console.log("error occured during socket reading data form file");
        //     }
        //     // else {
        //     //     io.sockets.emit('launch', data);
        //     //    console.log("emiting data from sockets and data is ",data);
        //     // }
        //     io.sockets.emit('launch', data);
        //     console.log(data);
        // });
       function intervalFunc() {
            var data = fs.readFile('programming.txt', 'utf8', (err, data) => {
                if (err) {
                    console.log("erroe in reading file");
                }
                else
                    io.sockets.emit('launch', data);
                //console.log(data);
            });
        }
       setInterval(intervalFunc, 1000);
     
//}


    });

    socket.on('testevent', function () {
        function intervalFunc() {

            for (var i = 1; i <= 10; i++) {
                var jawad_test = "hi i am called from test event" + i;
                io.sockets.emit('testevent', jawad_test);
            }
        }
        setInterval(intervalFunc, 1000);
    });
});
