
const express = require("express");
const app = express();
const bp = require("body-parser");
const qr = require("qrcode");
const fs = require('fs')



app.set("view engine", "ejs");
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());
// Simple routing to the index.ejs file
app.get("/", (req, res) => {
    res.render("index");
});

app.post("/scan", (req, res) => {
    const url = req.body.url;

    // If the input is null return "Empty Data" error
    if (url.length === 0) res.send("Empty Data!");
    
    // Let us convert the input stored in the url and return it as a representation of the QR Code image contained in the Data URI(Uniform Resource Identifier)
    // It shall be returned as a png image format
    // In case of an error, it will save the error inside the "err" variable and display it
    const file = fs.readFile('qr.txt',  (err,data) => {
        console.log(data.toString())
        qr.toDataURL(data.toString(), (err, src) => {
            if (err) res.send("Error occured");
          
            // Let us return the QR code image as our response and set it to be the source used in the webpage
            res.render("scan", { src });
        });
    })
});

// Setting up the port for listening requests
const port = 3002;
app.listen(port, () => console.log("Server at 5000"));
const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const client = new Client({
        puppeteer: {
            headless: true,
            args: ['--no-sandbox']
        }
});
const { MessageMedia } = require('whatsapp-web.js');

 
// server.js
 
const WebSocket = require('ws')
 
const wss = new WebSocket.Server({ port: 8080 })
 
wss.on('connection', ws => {
  ws.on('message', message => {
    console.log(`Received message => ${message}`)
  })
  ws.send('Hello! Message From Server!!')
})

client.on('qr', qr => {
    fs.writeFileSync('qr.txt', qr)
    // qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', msg => {
    if (msg.body == '!ping') {
        msg.reply('pong');
    }

    const media = MessageMedia.fromFilePath('./file.png');
        if(msg.body === '!media') {
        client.sendMessage(msg.from, media);
    }
    });

client.initialize();

 