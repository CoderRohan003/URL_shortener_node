const express = require("express");
const path = require("path");
const cookieParser = require('cookie-parser');
const {connectToMongoDB} = require('./connect')
const { restrictToLoggedinUserOnly,checkAuth } = require("./middlewares/auth")

const URL = require('./models/url');
const urlRoute = require('./router/url');
const staticRoute = require('./router/staticRouter');
const UserRoute  = require('./router/user');
const { handleDoEntry } = require("./controllers/url");
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
app.use("/user", UserRoute);
app.use("/",checkAuth,staticRoute);

app.get("/url/:shortId", handleDoEntry);


app.listen(PORT,()=>console.log(`Server started at PORT: ${PORT}`));
