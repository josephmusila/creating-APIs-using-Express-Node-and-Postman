const express = require("express");

const path = require("path");
const app = express();
const exphbs=require('express-handlebars')
const logger = require("./Middleware/logger");
const members=require('./Members')
/* app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname,'public',"index.html"));
}) */

//handlebars middleware

app.engine('handlebars',exphbs({defaultLayout: 'main'}));
app.set('view engine','handlebars');
//homepage
app.get('/',(req,res)=>res.render('index',{
    title:'Memebers app',
    members
}))
//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended:false}))
//init middleware
//app.use(logger);

//set static folder

app.use(express.static(path.join(__dirname, "public")));

app.use('/api/members',require('./routes/api/members'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`server staterd on port ${PORT}`);
});
