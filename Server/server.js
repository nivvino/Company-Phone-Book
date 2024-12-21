const dotenv = require("dotenv")
dotenv.config()
const express = require("express");
const app = express();
const PORT = 4000;
const path = require("path");
const axios=require('axios')
const cors= require('cors')
app.use(cors())
const bodyParser=require('body-parser')
app.use(bodyParser.json())

const session = require('express-session')
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false
}))
app.get('/api/get-session',(req,res)=>{
  if(!req.session.user||req.session.user===undefined){
    res.status(401).send('Not logged in.')
    return
  }
  if(req.session.user)
    res.send(req.session.user)
})
app.post('/api/log-in',async (req,res)=>{
    const {username,companyName}=req.body
    if(username.toLowerCase()==='example'){
      if(companyName.toLowerCase()==='example'){
        const user ={
          name:'NameExample',
          username:'usernameExample',
          company:{
            name:'companyNameExample'
          }
        }
        req.session.user=user
        res.send(`Welcome back ${req.session.user.name}`)
        return
      }
    }
    const data=await axios.get('https://jsonplaceholder.typicode.com/users')
    const users=data.data
    let user = users.filter(x=>(x.username.toLowerCase()===username.toLowerCase()))
    user = user[0]
    if(!user){
        res.status(401).send('Incorrect username.')
        return
    }else if(companyName.toLowerCase()!==user.company.name.toLowerCase()){
      res.status(401).send('Incorrect company name.')
      return
    }else{
      req.session.user=user
      res.send(`Welcome back ${req.session.user.name}`)
      return
    }
})
app.post('/api/get-contacts',async(req,res)=>{
  const {name,companyName,phone}=req.body
  const data=await axios.get('https://jsonplaceholder.typicode.com/users')
  let users = data.data
  if(name)
    users = users.filter(x=>new RegExp(name,'i').test(x.name))
  if(phone)
    users = users.filter(x=>new RegExp(phone,'i').test(x.phone))
  if(companyName)
    users = users.filter(x=>new RegExp(companyName,'i').test(x.company.name))
  if(users.length===0){
    res.status(404).send('Users not found')
  }else{
    res.send(users)
  }
})
app.get('/api/log-out',(req,res)=>{
  req.session.destroy()
  res.send('Logged out.')
})

app.use(express.urlencoded({ extended: false }));
app.use(express.json());



app.listen(PORT,'0.0.0.0' ,() => {
  console.log(`Server is live on http://localhost:${PORT}`);
});
