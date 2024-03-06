const express = require("express");
const path = require("path");
const cookieParser = require('cookie-parser');
const {connectToMongoDB} = require('./connect')
const { restrictToLoggedinUserOnly } = require("./middlewares/auth")

const URL = require('./models/url');
const urlRoute = require('./router/url');
const staticRoute = require('./router/staticRouter');
const UserRoute  = require('./router/user');
const app = express();
PORT = 8001;

connectToMongoDB('mongodb://localhost:27017/short-url')
.then(() => console.log('MongoDB connected'));

app.set("view engine","ejs");
app.set('views',path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use("/url",restrictToLoggedinUserOnly,urlRoute);

app.use('/', staticRoute);

app.use("/user", UserRoute)

app.listen(PORT,()=>console.log(`Server started at PORT: ${PORT}`));
