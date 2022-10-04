const express = require("express");
const path = require("path"); 
const app = express();
var mongoose = require('mongoose');
const bodyparser = require("body-parser");
mongoose.connect('mongodb://localhost/contactDance', { useNewUrlParser: true});
var db = mongoose.connection;
const port = 800;

// //DEFINE schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    massege: String,
    email: String,
});

var  contact = mongoose.model('contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{ 
    const params = { }
    res.status(200).render('project2.pug', params);
})
app.get('/contact', (req, res)=>{ 
    const params = { }
    res.status(200).render('contact.pug', params);
})
app.get('/services', (req, res)=>{ 
    const params = { }
    res.status(200).render('services.pug', params);
})
app.get('/about', (req, res)=>{ 
    const params = { }
    res.status(200).render('about.pug', params);
})
app.get('/order', (req, res)=>{ 
    const params = { }
    res.status(200).render('order.pug', params);
})
app.post("/contact", (req, res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
    res.send("This item has been saved to the database")
    }).catch(()=>{
    res.status(400).send("item was not saved to the databse")
});
   // res.status(200).render('contact.pug');

});

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});