const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Setting up cors config
app.use(cors());

// Settings
app.set('port', process.env.PORT || 3001);

// Starting Server
app.listen(app.get('port'), () => {
  console.log('Server online on port', app.get('port'));
});

// Routes
const routes = require('./api/routes');
routes(app);