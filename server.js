const express = require('express')
const app = express()
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const path = require("path");
const port = 8080
const cors = require('cors');


app.use(cors());
// router.use('/',  api);


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Blue*redx11963',
  database : 'simplemtgreact'
});


connection.connect(()=>{
  console.log("connected to simplemtgreact")
})

app.get("/api/testing", (req,res)=> {
  res.send('testing')
})

app.post('/api/edit', (req,res)=> {

  connection.query(`insert into meetings (meeting_title, start_date, start_time, attendees, topics_discussed, status)
  values ('test meeting3',  '2019-06-03', '10:00:00', 'Mila3, Alex3', 'MySql3 and React3','open')`, (err, result) => {
    if (err) console.log(err)
      console.log('its working !', result)
    
  })

  res.send()

})

app.get('/api/schedule', (req,res)=> {
  let results
  connection.query(`SELECT  meeting_id, meeting_title, DATE_FORMAT(start_date, "%M %D, %Y"), start_time, attendees, topics_discussed, status FROM meetings`, (err, rows, fields) => {
    if (err) console.log(err)
      console.log('its working !', rows)
    res.send(rows)
    // results = rows
  })

  

})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))

