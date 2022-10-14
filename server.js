//엄격한 코드 검사
'use strict';

/************* include library **************/
var express             = require('express');
var path                = require('path');
var server              = express();

/************* view engine setup **************/
server.set('views', path.join(__dirname, '/web'));

server.set('view engine', 'ejs');
server.engine('html', require('ejs').renderFile);


server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(express.static(path.join(__dirname, '/web')));


/************* Routing **************/

//intro
server.get('/', (req, res, next) => {
    res.render("index.html");
});

//Quary String에 대하여 알아보자
server.get('/study', (req, res, next) => {

    // http://localhost/study?id=1234&name=백석대

    let student = {
        id : 0,
        age : 0,
        name : "손님"
        
    }

    if(req.query.id !== null && req.query.id !== undefined){
        student.id = req.query.id;
    }
    if(req.query.age !== null && req.query.age !== undefined){
        student.age = req.query.age;
    }
    if(req.query.name !== null && req.query.name !== undefined){
        student.name = req.query.name;
    }
  
    console.log(student);
    res.render("iWillStudy.html", student);
});


//구구단 페이지
server.get('/99dan',  (req, res, next) => {

    // http://localhost/99dan?primary=8

    let gugudan = {
        primary : 2,
        length : 9
      
    }

    if(req.query.primary !== null && req.query.primary !== undefined){
        gugudan.primary = req.query.primary;
        gugudan.primary2= parseInt(gugudan.primary)+1;
    }
  
    res.render("99dan.html", gugudan);
});

//receive
server.post('/recvData',  (req, res, next) => {
let sensorData = {
    s_idx :2,
    sd_value: 2
}
if(req.body.s_idx !== null && req.body.s_idx !== undefined){
    sensorData.s_idx = req.body.s_idx;
    sensorData.s_idx= parseInt(sensorData.s_idx);
}
if(req.body.sd_value !== null && req.body.sd_value !== undefined){
    sensorData.sd_value = req.body.sd_value;
    sensorData.sd_value= parseInt(sensorData.sd_value);
}
console.log(req.body.s_idx);
console.log(req.body.sd_value);
console.log('매 분 마다 작업 실행');
res.send('ACK')
});

//getData
server.get('/getData',  (req, res, next) => {
    let sensorData = {
        hum :2,
        temp: 2,
        oxy: 2
    }
    sensorData.hum = Math.floor(Math.random() * 60);
    sensorData.temp = Math.floor(Math.random() * 100);
    sensorData.oxy = Math.floor(Math.random() * 101);
    res.send(sensorData)
    });

    //getData html
    server.get('/view', (req, res, next)=>{
        res.render("getData.html");
    });
module.exports = server;
