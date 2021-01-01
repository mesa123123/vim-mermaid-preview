const express = require('express');
const app = express();
const args = require('minimist')(process.argv.slice(2));
const fs = require('fs')
const path = require('path')
//const doAysnc = require('doasync');
datafile = path.join(__dirname, args.file);

let previewData;
function refreshPreview() {
    fs.readFile(datafile, 'utf8', function(err, data){
        if (err) {
            console.log(err)
            process.exit(1);
        }
        return data; 
    });
}

//Serve Dependencies
app.use('/mermaid', express.static(path.join(__dirname, 'node_modules/mermaid/dist')))

// Might have to use String.raw
app.get('/diagram', function (req, res) {
    previewData = refreshPreview()
    res.json({"diagram": previewData})
})

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'))
})

app.listen(args.port)
