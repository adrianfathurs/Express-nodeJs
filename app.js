const express = require('express')
const app = express()
const port = 3000
const mysql = require('mysql')
app.use(express.static('public'))
app.use(express.urlencoded({
  extended: false
}));
// connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'express'
})

//routing web

//gett data
app.get('/', (req, res) => {
  res.render('top.ejs');
});

app.get('/list', (req, res) => {
  connection.query(
    'SELECT * FROM barang',
    (error, results) => {
      console.log(results);
      res.render('list.ejs', {
        items: results
      });
    }
  )
});

app.get('/new', (req, res) => {
  res.render('new.ejs')
})

app.get('/edit/:id', (req, res) => {
  console.log(req.params.id)
  connection.query(
    'SELECT *  FROM barang WHERE id=?',
    [req.params.id],
    (error, results) => {
      console.log(results[0])
      res.render('edit.ejs', {
        items: results[0]
      })
    }
  )
})
//post data
app.post('/create', (req, res) => {
  connection.query(
    'INSERT INTO barang (nama_barang) VALUES(?)',
    [req.body.nama_belanja],
    (error, results) => {
      //res redirect akan menunjuk kr suatu url atau api
      //sedangakan untuk res render dia akan merender tampilan  
      res.redirect('/list')
    }
  )
})

app.post('/delete/:id', (req, res) => {
  connection.query(
    'Delete FROM barang WHERE id=?',
    [req.params.id],
    (error, result) => {
      res.redirect('/list')
    }
  )
})

app.post('/update/:id', (req, res) => {
  connection.query(
    'Update barang set nama_barang=? where id=?',
    [req.body.nama_belanja, req.params.id],
    (error, results) => {
      res.redirect('/list')
    }
  )
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})