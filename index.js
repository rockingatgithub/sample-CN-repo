const express = require("express");
const path = require('path');
const port = 8000;


const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();


app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded());

app.use(express.static('assets'));

//console.log(globalThis);   // checkout MDN

//below are two custom middlewares

// app.use((req, res, next) => {
//   // req.custom = "anyvalue";
//   console.log("middleware 1");
//   next();
// })

// app.use((req, res, next) => {
//   console.log("Middleware 2");
//   next();
// })



let contactList = [
  {
    name: "aa",
    phoneNumber: 123455,
    id: 1,
  },
  {
    name: "bb",
    phoneNumber: 123455,
    id: 2,

  },
  {
    name: "cc",
    phoneNumber: 123455,
    id: 3,

  },
  {
    name: "dd",
    phoneNumber: 123455,
    id: 4,

  }
]

app.get("/", function (req, res) {

  Contact.find({}, function(err, contacts){
    if(err){
      console.log("error getting the document");
      return res.redirect('back');
    }
    return res.render('home', {  title: "I RENDERED THE PAGE", contact_list: contacts });

  })

});

app.get("/test", (req, res) => {
  return res.render('jsinejs', { profile: { name: "SS", date: 24 }  });
})


app.post("/create", (req, res) => {

  console.log(req.body["name"], " name ", req.body["phone"]);

  // contactList.push({  name: req.body.name , phoneNumber: req.body.phone  });

  Contact.create(req.body, function(err, newContact){
    if(err){
      console.log("Error creating contact", err);
      return;
    }

    // console.log('the new contact', newContact);
    return;
  })

  return res.redirect('back');
})

app.get("/delete/:index", (req, res) => {
  // console.log(req.params.index);

  // contactList.splice(req.params.index -1, 1);

  Contact.findByIdAndDelete(req.params.index, (err)=> {
    if(err){
      console.log("Error creating contact", err);
      return;
    }
  })

  return res.redirect('back');
})

app.post("/update", (req, res) => {

  //update element .......

  return res.render("home", {  title: "I RENDERED THE PAGE", contact_list: contactList });

})

app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log("The express server is up and running", port);
});
