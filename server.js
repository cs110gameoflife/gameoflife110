let fs = require('fs');
let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);

app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
//3Tamik
//After we get the data from script.js,  we create a json object that represents .... After it we write the information in the statistics.json file. 
io.on('connection', function (socket) {
    socket.on("send data", function (data) {
        let grass = data[0][0];
        let herb = data[0][1];
        let pred = data[0][2];
        let super0 = data[0][3];
        let file = "statistics.json";
        let grbyhb = data[1][0];
        let hbbypd = data[1][1];
        let grbysp = data[1][2];
        let hbbysp = data[1][3];
        let pdbysp = data[1][4];
        let hbdie = data[2][0];
        let pddie = data[2][1];
        let spdie = data[2][2];
        let st = {
            "The current number of grasses" : grass,
            "The current number of herbivores" : herb,
            "The current number of predators" : pred,
            "The current number of super animals" : super0,
            "The number of grasses eaten by herbivores" : grbyhb,
            "The number of herbivores eaten by predators" : hbbypd,
            "The number of grasses eaten by super animals" : grbysp,
            "The number of herbivores eaten by super animals" : hbbysp,
            "The number of predators eaten by super animals" : pdbysp,
            "Years passed" : data[1][5],
            "The percentage of herbivores dead as a result of hunger" : Math.round(100*hbdie/(hbdie + hbbypd + hbbysp)),
            "The percentage of predators dead as a result of hunger" : Math.round(100*pddie/(pddie + pdbysp)),
            "The number of dead super animals" : spdie
        };
        let b = JSON.stringify(st, null, 2);
        fs.writeFileSync(file, b);
        //4 we then after strinngifying the json object we write the data on statistics.json file.
    })
});
