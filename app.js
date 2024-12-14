const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const jwtpassword = "balleballe"
const ALL_USERS = [
    {
        username : "vaibhavtanwar99@gmail.com",
        password : "coolboi123",
        name : "vaibhav"
    },
    {   
        username : "rockey628@gmail.com",
        password : "coolboi123",
        name : "abhishek"
    },
    {
        username : "shanu123@gmail.com",
        password : "coolboi123",
        name : "shaan"
    }
];

app.use(express.json())
function userExists(username,password){
  const userobj = {
    username : username,
    password : password,
  }

  for(let i=0;i<ALL_USERS.length;i++){
    if(ALL_USERS[i].username===userobj.username && ALL_USERS[i].password===userobj.password){
        return true;
    }
  }
  return false;
}


app.post('/signin',(req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    if(!userExists(username,password)){
        res.status(403).json({
            msg : "User doesn't exist in our in memory db"
        });
    } 
    var token = jwt.sign({username : username},"balleballe");
    return res.json({
        token,
    });
});


app.get('/users',(req,res) => {
   const authHeader = req.headers.authorization;
   if(authHeader && authHeader.startsWith("Bearer ")){
    const token = authHeader.slice(7);
     try{
        const decoded = jwt.verify(token,jwtpassword);
        const username = decoded.username;
        res.status(200).json({
            username : username
        })
     }
     catch{
        res.status(403).json({
            msg : "invalid credentials , user is not authorised"
        })
     }
   }
});

app.listen(3000,()=>{
  console.log("App is runnning on server succesfully");
});