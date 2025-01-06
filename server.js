const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();

app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
  host: "localhost",
  user: "root", 
  password: "", 
  database: "hotel_booking", 
  port: 3307, 
});

db.connect((err) => {
  if (err) {
    console.log("Error connecting to the database", err);
    return;
  }
  console.log("Connected to database");
});

//endpoint checkout
app.post("/checkout", (req, res) => {
  console.log("req.body", req.body); 
  const { fullName, phone, address, stayDuration, roomType } = req.body;

  if (!fullName || !phone || !address || !stayDuration || !roomType) {
    console.error('Valid error : missing required field')
    return res.status(400).send("Missing required field");
  }

  const query = `INSERT INTO bookings (fullName, phone, address, stayDuration, roomType) VALUES (?, ?, ?, ?, ?)`;
  db.query(query,[fullName, phone, address, stayDuration, roomType],(err, result) => {
      if (err) {
        console.error("Error inserting data", err);
        return res.status(500).send("Error inserting data");
      }
      console.log("insert successfull", result);
      res.send("Data successfully inserted");
    }
  );
});

//endpoint kontak
app.post('/contact', (req, res)=>{
  console.log("Request body:", req.body);
    const {name, email, message} = req.body;
    if(!name || !email){
      console.error("Validation error: Missing required fields");
      return res.status(400).send('Missing required field');
    }
    const query = `INSERT INTO contact_form (fullname, email, message) VALUES (?,?,?)`;
    db.query(query, [name, email, message], (err, result)=>{
        if(err){
            console.error('Error inserting data', err);
            return res.status(500).send('Error insterting data');
        }
    })
})

const port = 3001;
app.listen(port, ()=>{
    console.log(`server running on http://localhost:${port}`);
})