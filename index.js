// imported all required classes
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require('ejs'); 
const path = require("path");
const port = 3000;
const app = express();

// database connection settings 
const db = require("./config/mongoose");
const User = require("./models/signup");

// view engine called
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// converted into static files
app.use(express.static(path.join(`${__dirname}/public`)));
app.use(express.static(path.join(`${__dirname}/SignUp`)));
app.use(express.static(path.join(`${__dirname}/images`)));
// bodyParser is deprecated
app.use(bodyParser.urlencoded({ extended: true })); 

// directed to ejs page 
app.get("/home", function (req, res) {
    res.render("home", {
      title: "Let us play with ejs",
      cryptoName: "Btc",
      closingPrice: 10000,
      openPrice: 545154
    });
  });



  //  Api Data fetch request
  // app.get('/home', (req, res) => {
  //   axios.get('https://api.polygon.io/v1/open-close/crypto/BTC/USD/2023-04-08?adjusted=true&apiKey=csWptUkMBF4l9hjJU35vwH04vtFIpqJK')
  //     .then(response => {
  //       res.render('home', { data: response.data });
  //     })
  //     .catch(error => {
  //       console.error(error);
  //       res.render('error');
  //     });
  // });

  app.get('/price', async (req, res) => {
    res.sendFile(path.join(__dirname, "price.html"));
  });

  app.get('/contact', async (req, res) => {
    res.sendFile(path.join(__dirname, "contact.html"));
  });


  

// some issues with this post request
  app.post('/signup', async (req, res) => {
    const { username, password, email, fullName } = req.body;
  
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).send('Username already taken');
    }
  
    // Create a new user
    const user = new User({
      username,
      password,
      email,
      fullName
    });
  
    // Save the user to the database
    try {
      await user.save();
      res.send('User created successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while creating the user');
    }
  });


  // direct to sign up page
  app.get('/signup', async (req, res) => {
    res.sendFile(path.join(__dirname, "SignUp.html"));
  });


  // getting a present date 
  const today = new Date();
  const dateOptions = { month: '2-digit', day: '2-digit', year: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', dateOptions);
  
  console.log(formattedDate); // "04/09/2023"
  



  // https://api.polygon.io/v1/open-close/crypto/BTC/USD/2023-04-08?adjusted=true&apiKey=


  // send a index.html file to server
app.get("/", function(req, res) {   
    res.sendFile(path.join(__dirname, "index.html"));   
});


// post listening here 
app.listen(port, function (err) {
  if (err) {
    console.log("Error in running the server", err);
  }
  console.log("Yup!My Server is running on Port", port);
});
