// Importing Packages
const express=require('express');
const bodyParser=require('body-parser');
const db=require('./app.js');
const crudroutes=require('./db_crud.js');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const { users, generateToken } = require('./Auth');

const { authenticateUser } = require('./Auth');





require('dotenv').config(); // Load environment variables

// Init App
const app=express();
app.use(cors());
app.use(crudroutes.routes);
app.use(express.json())




app.use(bodyParser.urlencoded());

// Getting Skills Data

app.get('/data',async (req,res)=>{
  try{
    datas=await db.get_skill_datas();
    res.json(datas);

  }
  catch
  {
    res.json({
      'status':'error'
    });
  }

    

});


// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log(username,password);
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    const token = generateToken(user.username);
    res.json({ token: token });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});





  



app.listen(3000);