const connectToMongo = require('./database.js');
var cors = require('cors')
const express = require('express');
const routes = require('./src/routes')
connectToMongo();

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
// to enable to sent json file
app.use(express.json())

// require routes pass from here
app.use('/api', routes);

app.listen(port,()=>{
    console.log(`Running at port:${port}`)
})