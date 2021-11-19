const express = require("express");
const path = require('path');
const port = 8000;

const app = express();


app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded());

app.use(express.static('assets'));

//console.log(globalThis);   // checkout MDN


app.use((req, res, next) => {
  // req.custom = "anyvalue";
  console.log("middleware 1");
  next();
})

app.use((req, res, next) => {
  console.log("Middleware 2");
  next();
})



let contactList = [
  {
    name: "aa",
    phoneNumber: 123455,
  },
  {
    name: "bb",
    phoneNumber: 123455,
  },
  {
    name: "cc",
    phoneNumber: 123455,
  },
  {
    name: "dd",
    phoneNumber: 123455,
  }
]

app.get("/", function (req, res) {
 return res.render('home', {  title: "I RENDERED THE PAGE", contact_list: contactList });
});

app.get("/test", (req, res) => {
  return res.render('jsinejs', { profile: { name: "SS", date: 24 }  });
})


app.post("/create", (req, res) => {

  console.log(req.body["name"], " name ", req.body["phone"]);

  contactList.push({  name: req.body.name , phoneNumber: req.body.phone  });

  return res.render("home", {  title: "I RENDERED THE PAGE", contact_list: contactList });
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
