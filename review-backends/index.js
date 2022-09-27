const cors = require("cors");
const express = require('express');
const app = express();
require('./model/config')
const routerList = require('./routes/index');
const cookieParser = require('cookie-parser')

app.use(cookieParser({Credentials : true, 
  origin : "http://localhost:3000" }))

// app.use(cookieParser())
  app.use(
    cors({
      credentials : true,
      origin: 'http://localhost:3000', // origin should be where the frontend code is hosted
    })
  );

  //app.use(cors());

  app.use(function (req, res, next) {
    res.header('Content-Type', 'application/json;charset=UTF-8');
    res.header('Access-Control-Allow-Credentials', true);
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });

app.use(express.json());
app.use(express.static(__dirname))
app.use('/',routerList)

app.listen(5000) 