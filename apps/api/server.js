const express = require('express')
const app = express()
const port = 3001
var cors = require('cors')
var bodyParser = require('body-parser')

app.use(cors()) // Use this after the variable declaration
app.use(bodyParser.json());

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

const exercises = [
    { id: 1, name: 'truc1' },
    { id: 2, name: "truc2" },
    { id: 3, name: "truc3" }
]

// npm install
const mongoose = require('mongoose');

const server = '127.0.0.1:27017'; // REPLACE WITH YOUR OWN SERVER
const database = 'workout';          // REPLACE WITH YOUR OWN DB NAME

mongoose.connect(`mongodb://${server}/${database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected!!');
}).catch(err => {
    console.log('Failed to connect to MongoDB', err);
});

const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
});

const User = mongoose.model('users', userSchema);
let user1 = 'a'
User.find({ firstname:'Erwann', lastname:'Le Roux' })
    .then(user => {
        user1=user
    }).catch(err => {
        console.log(err);
    });
app.get('/', (req, res) => {
    res.send('Hello World!')
    
})

app.get('/programs', (req, res) => {
    res.send(exercises)
})

app.get('/programs/:id', (req, res) => {
    const id = req.params.id
    res.send(exercises.find(exercise => exercise.id == id))
})


app.post('/userInfo', (req, res)=>{
    const firstname = req.body.name.firstname
    const lastname = req.body.name.lastname
    User.create({
        firstname, 
        lastname 
    }).then(user => {
        res.status(201).send(user)
    }).catch(err => {
        res.status(409).send(err)
    });
})

app.post('/logIn', (req, res)=>{
    const firstname = req.body.name.firstname
    const lastname = req.body.name.lastname
    console.log(firstname)
    console.log(lastname)
    User.find({ firstname: firstname, lastname: lastname }).then(user => {
        console.log(user.length)
        if(user.length>0){
            console.log("prout")
            res.status(201).send(user)
        }
    }).catch(err => {
        res.status(409).send(err)
    });
})

app.get("/home", cors(), async (req, res) =>{
    res.send("this is the data for the home page")
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})