const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const USERS_FILE = "users.json";
const POSTS_FILE = "posts.json";

// créer fichiers si inexistants
if (!fs.existsSync(USERS_FILE)) fs.writeFileSync(USERS_FILE, "[]");
if (!fs.existsSync(POSTS_FILE)) fs.writeFileSync(POSTS_FILE, "[]");

// INSCRIPTION
app.post("/register", (req,res)=>{
    let users = JSON.parse(fs.readFileSync(USERS_FILE));
    users.push(req.body);
    fs.writeFileSync(USERS_FILE, JSON.stringify(users));
    res.json({status:"ok"});
});

// LOGIN
app.post("/login",(req,res)=>{
    let users = JSON.parse(fs.readFileSync(USERS_FILE));
    let user = users.find(u=>u.email==req.body.email && u.password==req.body.password);
    res.json(user ? {status:"ok"} : {status:"error"});
});

// PUBLIER
app.post("/post",(req,res)=>{
    let posts = JSON.parse(fs.readFileSync(POSTS_FILE));
    posts.unshift({
        user:req.body.user,
        text:req.body.text,
        likes:0
    });
    fs.writeFileSync(POSTS_FILE, JSON.stringify(posts));
    res.json({status:"posted"});
});

// VOIR POSTS
app.get("/posts",(req,res)=>{
    let posts = JSON.parse(fs.readFileSync(POSTS_FILE));
    res.json(posts);
});

// LIKE
app.post("/like",(req,res)=>{
    let posts = JSON.parse(fs.readFileSync(POSTS_FILE));
    posts[req.body.index].likes++;
    fs.writeFileSync(POSTS_FILE, JSON.stringify(posts));
    res.json({status:"liked"});
});

app.listen(3000,()=>console.log("🎄 Cabrino de Noël Social ON"));
