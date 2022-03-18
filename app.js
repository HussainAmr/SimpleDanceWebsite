const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/contactDance', {useNewUrlParser: true});
const port = 80;


//Define mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    query: String,
});
let Contact =  mongoose.model('detail', contactSchema);


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'));
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//END POINTS
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params);
    
});

app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);
    
});

app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() =>{
        res.send('This item has been saved to database');
    }).catch(()=>{
        res.status(400).send("Item was not saved to database");
    })
    // res.status(200).render('contact.pug');
    
});

//START SERVER
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})