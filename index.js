const express = require('express');
const app = express();
const http = require('http').Server(app)
const io = require('socket.io')(http)
const args = require('minimist')(process.argv.slice(2));
const fs = require('fs')
const path = require('path')


//Get the path of the datafile
datafile = path.join(__dirname, args.file);
console.log(`datafile ${datafile}`);

// On Connection Send the Diagram to the Client
io.on("connection", (socket) => {
    fs.readFile(datafile, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        socket.emit('diagram', {"diagram": data});
    })
});



//Watch for file changes in the diagram
fs.watchFile(datafile, (curr, prev) => {
    fs.readFile(datafile, 'utf8', (err, data) => {
        if (err){
            console.log(err);
            process.exit(1);
        }
        io.sockets.emit('diagramChange', {"diagram": data})
    })
});

//Serve Dependencies - Mermaid, to render the diagram on the client
app.use('/mermaid', express.static(path.join(__dirname, 'node_modules/mermaid/dist')))
//Socket.IO, to get diagram changes from the server
app.use('/socketio', express.static(path.join(__dirname, 'node_modules/socket.io/client-dist')))

// Sends the diagram in the file to the client
//app.get('/diagram', function (req, res) {
//    previewData = refreshPreview()
//    res.json({"diagram": previewData})
//})

// Sends the HTML to the client
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'))
})

http.listen(args.port, function () {console.log(`App Listening on ${args.port}`)})
