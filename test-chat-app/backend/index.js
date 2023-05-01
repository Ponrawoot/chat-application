const express = require("express");
const cors = require("cors");
const {default:axios} = require("axios");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
  const { username, secret } = req.body;
  console.log(req.body)
  try{
    const r =await axios.put(
        'https://api.chatengine.io/users/',
        {username: username, secret: secret},
        {headers: {"private-key": "6cf0b27b-752d-41bb-96f4-17906fb2c8a2"}}
    )
    return res.status(r.status).json(r.data)
  }catch(e){
    return res.status(e.response.status).json(e.response.data);

  }
});

app.get("/users", async (req, res) => {
  try{
    const r =await axios.get(
        'https://api.chatengine.io/users/',
        {headers: {"private-key": "6cf0b27b-752d-41bb-96f4-17906fb2c8a2"},params:{
          query: "username"
        }},
    )
    return res.status(r.status).json(r.data)
  }catch(e){
    return res.status(e.response.status).json(e.response.data);
  }
});

app.listen(3001);

