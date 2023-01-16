const express = require('express');
const mysql = require('mysql2');

// Create connection
// update database after visiting the site.
const db = mysql.createConnection({
  host : 'localhost',
  user: 'root',
  password: "",
  database: 'nodemysql'
});
// Connect DB before call.
db.connect((err) => {
  if(err) {
    console.log(err);
  }
  console.log('MySql Connected...');
});

const app = express();

// Create new DB
// need to visit localhost:3001/createdb to create db
app.get('/createdb', (req, res) => {
  let sql = 'CREATE DATABASE nodemysql';
  db.query(sql, (err, result) => {
    if(err) { console.log(err) }
    console.log(result);
    res.send('Database created...');
  });
})

 // Create table
 app.get('/createpoststable', (req, res) => {
  let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';  // needs to be in parenthesis
  db.query(sql, (err, result) => {
    if(err) {throw err}
    console.log(result);
    res.send('Posts table created...');
  });
});

// Insert post 1 into DB
app.get('/addpost1', (req, res) => {
  let post = {title: 'Post One', body: 'This is post number one'};  //data-type
  let sql = 'INSERT INTO posts SET ?';
  let query = db.query(sql, post, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('Post 1 added...')
  });
})
// Insert post 2 in to DB;
app.get('/addpost2', (req, res) => {
  let post = {title: 'Post One', body: 'This is post number one'};  //data-type
  let sql = 'INSERT INTO posts SET ?';
  let query = db.query(sql, post, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('Post 2 added...')
  });
});

// Select All posts from DB
app.get('/getposts', (req, res) => {
  let sql = 'SELECT * FROM posts';
  let query = db.query(sql, (err, results) => {
    if(err) throw err;
    console.log('In the Server', results); // pss through template in views, etc.
    res.send('Posts fetched...');
  });
});

// Select Single post  from DB
app.get('/getpost/:id', (req, res) => {
  let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if(err) throw err;
    console.log('request.params: ', req.params);
    console.log('In the Server', result);
    res.send('Posts fetched...');
  });
});

// Update Post in DB
app.get('/updatepost/:id', (req, res) => {
  let newTitle = 'Updated Title';    // SQL need quotes around it for sql query
  let sql = `UPDATE posts SET title =  '${newTitle}' WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if(err) throw err;
    console.log('request.params: ', req.params);
    console.log('In the Server', result);
    res.send('Posts updated...');
  });
})

// Delete post
app.get('/deletepost/:id', (req, res) => {
  let newTitle = 'Updated Title';
  let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('Post deleted...');
  });
});



app.listen('3001', () => {
  console.log(`Server started on port 3001`);
});