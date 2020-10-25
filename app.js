const fs = require('fs');
const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const dbconfig = require('./config/database.json');
const mysql = require('mysql');
const cors = require('cors');

const port = 3000;

const data = fs.readFileSync('./config/database.json');
const conf = JSON.parse(data);
let connection;
function handleDisconnect(){
  connection = mysql.createConnection({
    host : conf.host,
    user: conf.user,
    password: conf.password,
    port : conf.port,
    database : conf.database
  });

  connection.connect(function(err){
    if(err){
      console.log("error when connecting to db:");
      setTimeout(handleDisconnect, 2000);
    }
  });

  connection.on('error', function(err){
    console.log('db error', err);
    if(err.code ==='PROTOCOL_CONNECTION_LOST'){
      handleDisconnect();
    }
    else{
      throw err;
    }
  })
}

handleDisconnect();

app.use(cors());
app.use(express.static('public'));
app.set('views', __dirname + '/public/images');
app.set('views', __dirname + '/views');
app.set('views engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true}));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

var router = require('./router/main')(app,connection);
