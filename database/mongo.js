const mongoose = require("mongoose");
require('dotenv').config()
// Start Mongo Connection
const mongoDB = mongoose.connect(process.env.MONGO_URI)
    .then(
        (result) => {console.log('Mongo DB Connected') }
    )
    .catch(
        (err) => { console.log(Error)  }
    )
// End of Mongo Connection

module.exports = mongoDB