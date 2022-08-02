const express = require('express');
const cors = require('cors')

const keys = require('./config/keys');

// app configuration
const app = express();

app.use(cors());

// conversation routes
require('./routes/conversationRoutes')(app)

// run app
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log('server started'));