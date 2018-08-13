var express =   require("express"),
    app     =   express();

app.use(bodyParser.urlencoded({extended: true})); 
app.set("view engine", "ejs");