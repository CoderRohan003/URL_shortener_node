const express = require("express");
const {connectToMongoDB} = require('./connect')
const urlRoute = require('./router/url')
const URL = require('./models/url');
const app = express();
PORT = 8001;

connectToMongoDB('mongodb://localhost:27017/short-url')
.then(() => console.log('MongoDB connected'));

app.use(express.json());

app.use("/url",urlRoute)

app.listen(PORT,()=>console.log(`Server started at PORT: ${PORT}`));
