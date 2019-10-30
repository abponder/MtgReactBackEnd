const express = require('express')
const app = express()
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const path = require("path");
const port = 8080
const cors = require('cors');
app.use(express.json()); 


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

app.put('/api/edit', (req,res)=> {
  console.log('this is the data coming back', req.body)
  //changed to STR_TO_DATE, added ticks, put comma in! argh
  connection.query(`
    UPDATE meetings 
    SET meeting_title = '${req.body.meetingTitle}',  
    start_date = STR_TO_DATE('${req.body.startDate}', "%M %D, %Y"), 
    start_time = '${req.body.startTime}',
    attendees = '${req.body.attendees}',
    topics_discussed = '${req.body.topicsDiscussed}',
    status = '${req.body.status}'
    WHERE meeting_id = '${req.body.meetingId}'`, (err, result) => {
      console.log('err :',err)  
    console.log('new edit data', result)
  })
  // connection.query(`insert into meetings (meeting_title, start_date, start_time, attendees, topics_discussed, status)
  // values ('${req.body.meetingTitle}',  '${req.body.startDate}', '${req.body.startTime}', '${req.body.attendees}', '${req.body.topicsDiscussed}','${req.body.status}')`, (err, result) => {
  //   if (err) console.log(err)
  //     console.log('its working !', result)
    
  // })

  res.send(req.body)

})

app.get('/api/schedule', (req,res)=> {
  let results
  connection.query(`SELECT  meeting_id, meeting_title, DATE_FORMAT(start_date, "%M %D, %Y"), start_time, attendees, topics_discussed, status FROM meetings`, (err, rows, fields) => {
    if (err) console.log(err)
      console.log('its working !', rows)
      let formatedrows=rows.map(record => {
        return {
          meetingId:record.meeting_id,
          meetingTitle:record.meeting_title,
          startDate:record['DATE_FORMAT(start_date, "%M %D, %Y")'],
          startTime:record.start_time,
          attendees:record.attendees,
          topicsDiscussed:record.topics_discussed,
          status:record.status[0].toUpperCase() + record.status.slice(1)

        }
      })
    res.send(formatedrows)
    // results = rows
  })

  

})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))

