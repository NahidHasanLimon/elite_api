const express = require('express'); // using express
const mongoDB = require("./database/mongo")
const cors = require('cors')
const category_routes = require('./routes/category')
const product_routes = require('./routes/product')
const port = process.env.APP_PORT||3001 // setting the port
let app = express();
app.use(cors({
    origin: '*'
}));

app.listen(port, ()=>{
    console.log('Application running on port, ', port)
});



// routes 
app.get("/", (req, res) => {
    res.send('Welcome to endolite api.')
})

app.use('/api/category', category_routes)
app.use('/api/product', product_routes)

app.get('*', function(req, res){
   res.status(404).send(`not found`);
});