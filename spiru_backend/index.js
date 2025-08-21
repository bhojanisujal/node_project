const express = require("express");
const router = require("./router/router");
const errorHendler = require("./middlewares/errorHendler");
const cookieParser = require("cookie-parser");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/auth.json');
const ejs = require("ejs");
const fs = require("fs");
const cors = require('cors');
const connectDB = require("./config/Dbcolaction"); 

const app = express();
const port = 4000;


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.set('view engine', 'ejs');
app.use(express.json());
app.use(cookieParser());

app.use('/product', express.static('public/product'));
app.use('/category', express.static('public/category'));


app.use('/api', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(errorHendler);


app.get('/', (req, res) => {
  res.render('index', {
    user: {
      name: "hella",
      email: "hella@gmail.com",
      age: "99",
      skill: ["JS", "CSS", "HTML"],
    }
  });
});


  app.listen(port, () => {
    console.log("Server is running on port", port);
  });