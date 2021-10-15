const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

//create an array of for items to be added to the todo list
const items = ["Buy Food", "Cook Food", "Eat Food"];

const workItems = [];

//set the apps view engine to ejs
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

//set up express to be able to use static files in public
app.use(express.static("public"));

app.get("/", function(req, res) {
    
    //get the day from the date module
    const day = date.getDate();

    //use render function to look for the list file.
    //pass in a js object with a key (the var marker) value pair
    res.render('list', {
        listTitle: day,
        newListItems: items
    });

});


app.post("/", function(req, res) {

    let item = req.body.newItem;

    if(req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        //when a post req is triggered on home route, it will save item value and redirect to line 23.
        //passed the newListItem to line 39.
        res.redirect("/");
    }    

});

app.get("/work", function(req, res) {

    res.render('list', {
        listTitle: "Work List",
        newListItems: workItems
    });
});


app.get("/about", function(req, res) {

    res.render("about");
});

app.listen(3000, function(){
    console.log("Server started on port 3000");
});