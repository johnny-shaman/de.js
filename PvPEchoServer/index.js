var WebSocketServer = require('ws').Server,
    http = require('http'),
    express = require('express'),
    cors = require('cors'),
    app = express(),
    offering = [],
    answering = [],
    server,
    wss;


app.use(cors());
app.get('/', (req, res) => res.end('200 OK'));

server = http.createServer(app);
wss = new WebSocketServer({server : server});

//var connections = [];

wss.on('connection', (ws) => {
    ws.say = (text) => {
        ws.send(text);
        return ws;
    };

    if (offering.length <= 0) {
        offering.push(ws);
        ws.send(JSON.stringify(false));
        console.log('offered at ' + new Date().toISOString());
    } else {
        answering.push(ws);
        ws.send(offering[0].sdp);
        console.log('answered at ' + new Date().toISOString());
    }

    ws.on('close', () => {
        offering.forEach((conn, i) => {
            if (conn === ws) {
                offering.splice(i, 1);
            }
        });
        
        answering.forEach((conn, i) => {
            if (conn === ws) {
                answering.splice(i, 1);
            }
        });
    });
    
    ws.on('message', (message) => {
        offering.forEach((conn, i) => conn === ws ? offering[i].sdp = message : false);
        answering.forEach((conn, i) => {
            if (conn === ws) {
                ws.close();
                offering[0].say(message).close();
                offering.shift();
                answering.splice(i, 1);
            }
        });
    });
});

server.listen(process.env.PORT, process.env.IP);
