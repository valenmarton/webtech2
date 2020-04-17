const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb+srv://valentin:HmxUDZSat4jMjAg@cluster0-z3u6p.mongodb.net/test?retryWrites=true&w=majority', 
{ useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
        return console.log(err)
    }
    console.log("Connected to mongodb successfully ")
    exports.db = client.db('webtech2')
})

