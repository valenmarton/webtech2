const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

// import mongo client
const mongoClient = require('../db/mongo')

app.use(cors(), bodyParser.json())

// should be a real authentication middleware
app.use(function (req, res, next) {
    console.log(`Middleware, that runs before every request. Called path: ${req.path}`)
    next() // run handler on path if there is not problem in middleware
})

app.get('/', (req, res) => {
    res.send('Server is up.')
})

app.post('/signup', (req, res) => {
    mongoClient.db.collection('users').findOne(req.body, (err, result) => {
        if (err) {
            return console.log(err)
        }
        if (result !== null && req.body.email === result.email) {
            console.log(`This email is already in use ${result.email}`)
            res.status(409).send("Már van regisztrált felhasználó ezzel az email címmel.")
        }
        else {
            mongoClient.db.collection('users').insertOne(req.body, (err, result) => {
                if (err) {
                    return console.log(err)
                }
                console.log(`New document is created in the users collection. ${result}`)
            })
            res.status(201).end('Sikeres regisztráció, most már bejelentkezhetsz!')
        }
    })
}) 

app.post('/signin', (req, res) => {
    if (req.body.email === "" || req.body.password === "" || req.body.email === undefined || req.body.password === undefined) {
        res.status(203).send("Nem adtál meg a email címet vagy jelszót.")
        return
		}
    mongoClient.db.collection('users').findOne(req.body, (err, result) => {
        if (err) {
            return console.log(err)
        }
        else if (result === null) {
           res.status(404).send("Nincs regisztrált felhasználó a megadott adatokkal!")
        }
        else {
            res.status(200).send("Sikeres belépés!")
            console.log(`User is logged in successfully. ${result.email}`)
        }
            
    })
})

app.post('/sicks', (req, res) => {
    mongoClient.db.collection('sicks').findOne({"ssn": req.body.ssn}, (err, result) => {
        if (err) {
            return console.log(err)
        }
        if (result !== null && req.body.ssn === result.ssn) {
            res.status(409).send("Már van felvett beteg ezen a tajszámon.")
        }
        else {
            mongoClient.db.collection('sicks').insertOne(req.body, (err, result) => {
                if (err) {
                    return console.log(err)
                }
                console.log(`New document is created in the sicks collection. ${result}`)
            })
            res.status(201).end()
        }
    })
})


//instead of path variable (req.params), using query params (req.query)
//get document querying by request query params
//ssn = social security number (tajszám akarna lenni:D)
app.get('/sicks/ssn', (req, res) => {
    console.log(req.query)
    mongoClient.db.collection('sicks').findOne({ ssn:parseInt(req.query.ssn) }, (err, result) => {
        if (err) {
            return console.log(err)
        }
        if(result === null) {
            console.log('No document was found based on query parameter.')
            return
        }
        console.log('Query was successful, the document is returned based on social security number.')
        res.status(200).send(result)
    })
})

app.get('/sicks', (req, res) => {
    // empty object or simply don't pass argument to return every document
    // I passed empty object because of readability (empty query parameter -> all documents)
    mongoClient.db.collection('sicks').find({}).toArray((err, result) => {
        if (err) {
            return console.log(err)
        }
        console.log('Query was successful, all sick people are returned.')
        res.status(200).send(result)
    })
})

const server = app.listen(3000, () => {
    console.log(`Server is listening on port: ${server.address().port}`)
})