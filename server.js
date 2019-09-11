const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const socketIo = require('socket.io');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './api/uploaded');
  },
  filename: (req, file, callback) => {
    callback(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
  }
});

const upload = multer({ storage });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Setting up cors config
app.use(cors());

// Settings
app.set('port', process.env.PORT || 3001);

// Starting Server
const server = app.listen(app.get('port'), () => {
  console.log('Server online on port', app.get('port'));
});

// Setting up Socket.io
let io = socketIo(server);

io.on('connection', () =>{
  console.log('a user is connected')
 })

// Routes
const routes = require('./api/routes');
routes(app, io, upload);