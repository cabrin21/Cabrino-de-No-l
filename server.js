const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const db = [
"users.json",
"posts.json",
"messages.json",
"friends.json",
"stories.json",
"photos.json",
"notifications.json"
];

db.forEach(file=>{
 if(!fs.existsSync(file)) fs.writeFileSync(file,"[]");
});

const read = f => JSON.parse(fs.readFileSync(f));
const write = (f,d)=>fs.writeFileSync(f,JSON.stringify(d,null,2));

app.post("/register",(req,res)=>{
 let users = read("users.json");
 users.push(req.body);
 write("users.json",users);
 res.json({ok:true});
});

app.post("/login",(req,res)=>{
 let users = read("users.json");
 let u = users.find(x=>x.email==req.body.email && x.password==req.body.password);
 res.json(u?{ok:true}:{ok:false});
});

app.post("/post",(req,res)=>{
 let posts = read("posts.json");
 posts.unshift({
  user:req.body.user,
  text:req.body.text,
  likes:0,
  comments:[]
 });
 write("posts.json",posts);
 res.json({ok:true});
});

app.get("/posts",(req,res)=>res.json(read("posts.json")));

app.post("/like",(req,res)=>{
 let p = read("posts.json");
 p[req.body.index].likes++;
 write("posts.json",p);
 res.json({ok:true});
});

app.post("/comment",(req,res)=>{
 let p = read("posts.json");
 p[req.body.index].comments.push({
  user:req.body.user,
  text:req.body.text
 });
 write("posts.json",p);
 res.json({ok:true});
});

app.post("/sendMessage",(req,res)=>{
 let m = read("messages.json");
 m.push(req.body);
 write("messages.json",m);
 res.json({ok:true});
});

app.get("/messages",(req,res)=>res.json(read("messages.json")));

app.post("/addFriend",(req,res)=>{
 let f = read("friends.json");
 f.push(req.body);
 write("friends.json",f);

 let n = read("notifications.json");
 n.push({user:req.body.to,text:req.body.from+" vous a ajouté"});
 write("notifications.json",n);

 res.json({ok:true});
});

app.post("/story",(req,res)=>{
 let s = read("stories.json");
 s.unshift(req.body);
 write("stories.json",s);
 res.json({ok:true});
});

app.get("/stories",(req,res)=>res.json(read("stories.json")));

app.post("/uploadPhoto",(req,res)=>{
 let p = read("photos.json");
 p.unshift(req.body);
 write("photos.json",p);
 res.json({ok:true});
});

app.get("/photos",(req,res)=>res.json(read("photos.json")));

app.get("/notifications",(req,res)=>res.json(read("notifications.json")));

app.listen(3000,()=>console.log("🎄 Cabrino de Noël fonctionne"));
