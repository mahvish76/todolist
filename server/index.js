const express = require('express');
const mysql = require('mysql');
const session = require('express-session');
const MYSQLStore = require('express-mysql-session')(session);
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const MySQLStore = require('express-mysql-session');

const app = express();
app.use(cors(
  {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }
));
app.use(express.json());

// The body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }))

// create connection
const mysqlDb = {
  host: 'localhost',
  user: 'root', // place your username
  password: 'root1234', // place your mysql password
  //database: 'todoapp'
};
// create connection
const db = mysql.createConnection(mysqlDb)
// store session in database
const storesession = new MySQLStore({}, db);
// session
app.use(session({
  key: 'session_cookie_key',
  secret: 'asdflkjuycnbmvr',
  store: storesession,
  resave: false,
  saveUninitialized: false,
  cookie: {}
}));
// table
// db.connect((err) => {
//   if (err) throw err;
//   console.log('connect ...');
//   let users = 'CREATE TABLE IF NOT EXISTS users(id int NOT NULL AUTO_INCREMENT, name VARCHAR(50) NOT NULL, email VARCHAR(100) NOT NULL, password VARCHAR(255) NOT NULL, PRIMARY KEY(id))';

//   db.query(users, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//   });

//  let lists = 'CREATE TABLE IF NOT EXISTS lists(id int AUTO_INCREMENT, userId int NOT NULL, note VARCHAR(255) NOT NULL, day VARCHAR(255) NOT NULL, completed BOOLEAN, PRIMARY KEY(id), FOREIGN KEY(userId) REFERENCES users(id))';
  
//   db.query(lists, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//   });

// });

// create database
let sql = 'CREATE DATABASE IF NOT EXISTS todoapp';
db.query(sql, (err, result) => {
  if (err) throw err;
});
const protectedRoute = (req, res, next) => {
  if (req.session.user) {
    res.json({loggedIn : true, user: req.session.user})
    next()
  } else {
    res.json({loggedIn: false})
  }
}
// user dashboard
app.get('/:id/dashboard', protectedRoute, (req, res) => { 
    const userId = req.params.id;
    const sqlFind = "SELECT * FROM users WHERE id = ?";
    db.query(sqlFind, [userId], (err, result) => {
      console.log(result);
    })
})
// Selectto-do lists
app.get('/:id/lists', (req, res) => {
    const id = req.params.id;
    const sqlFind = "SELECT * FROM lists WHERE userId = ?";
    db.query(sqlFind, [id], (err, result) => {
      res.json(result);
    });
})
// create to-do list
app.post('/:id/api/list/create', async (req, res) => {
  const note = req.body.note;
  const day = req.body.day;
  const id = req.params.id;
  const createList = "INSERT lists(note, day, userId) VALUES(?,?,?)";
  
   db.query(createList, [note, day, id], (err, result) => {
    if (err) throw err;
    console.log('list created with completed value');
    res.send(result);
  })
});

// delete to-do list
app.delete('/api/list/delete/:id', (req, res) => {
  const id = req.params.id;
    const removeList = "DELETE FROM lists WHERE id = ?";
    db.query(removeList, id, (err, result) => {
      if (err) throw err;
        console.log('delete list...');
        res.send(result);
      });
})

// user registeration
app.post('/api/register', async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const saltGen = await bcrypt.genSalt();
  const password = await bcrypt.hash(req.body.password, saltGen);
  const emailDb = 'SELECT * FROM users WHERE email = ?';
  
  const checkEmail = db.query(emailDb, [email], (err, result) => {
    if (err) throw err;
    if (result.length !== 0) {
      console.log("already exists");
      res.json({msg : "This email already exists"});
    } else {
       db.query(
        "INSERT INTO users (name, email, password) VALUES (?,?,?)", [name, email, password], (error, response) => {
         if (error) throw error;
          res.send(response)
        }
      );  
    }
  });
});
// user login
app.post('/login', (req, res) => {
  email = req.body.email;
  password = req.body.password;
  
  let sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      console.log("user doesn't exist")
      res.sendStatus(400)
    } else {
    bcrypt.compare(password, result[0].password, (err, response) => {
      if (response) {
        req.session
        req.session.user = result;
        console.log('login is successful');
        res.send({loggedIn: true, user: req.session.user});
      } else {
        console.log("wrong password");
        res.send({loggedIn: false, msg: "password or email is not correct"});
      }
    });
  }
  });
});
// logout 
app.post('/logout', protectedRoute, (req, res) => {
  req.session.destroy();
});
// auth 
app.get('/auth', protectedRoute, (req, res) => {
  console.log("auth")
})
// port
app.listen('3001', () => {
  console.log('3001 server is running');
})